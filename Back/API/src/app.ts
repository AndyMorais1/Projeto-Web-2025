import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import { userRoutes } from './routes/UserRoute';
import fastifyStatic from '@fastify/static';
import path from 'path';
import fastifyJwt from '@fastify/jwt'
import { houseRoutes } from './routes/HouseRoute';
import cors from '@fastify/cors';
import dotenv from 'dotenv';
import {emailRoutes} from "./routes/EmailRoutes";
dotenv.config();

export const server = Fastify({
  logger: {
    level: 'trace',
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'req,reqId,hostname,responseTime',
      },
    },
  }
});

server.register(cors, {
  origin: "*", // Permite qualquer origem (pode ser mais restritivo)
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
});

declare module 'fastify' {
  export interface FastifyInstance {
    authenticate: any;
  }
}

server.register(fastifyJwt, {
  secret: 'supersecret'
});

server.decorate("authenticate", async function (request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();
  }
  catch (err) {
    return reply.send(err);
  }
});

server.register(fastifyStatic, {
  root: path.join(__dirname, 'html'),
  prefix: '/public/',
});

async function main() {

  server.register(userRoutes, { prefix: '/users' });
  server.register(houseRoutes, { prefix: '/houses' });
  server.register(emailRoutes, { prefix: '/email' });

  try {
    await server.listen({ port: 4000, host: '127.0.0.1' });
    console.log('Server listening on port 4000');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}
main();
