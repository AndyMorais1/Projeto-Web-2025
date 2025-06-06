import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import { userRoutes } from './routes/UserRoute';
import fastifyStatic from '@fastify/static';
import path from 'path';
import fastifyJwt from '@fastify/jwt'
import { houseRoutes } from './routes/HouseRoute';
import cors from '@fastify/cors';
import dotenv from 'dotenv';
import {emailRoutes} from "./routes/EmailRoutes";
import "./types/fastify.d.ts";
import { favoriteRoutes } from "./routes/FavoriteRoutes";
import { houseTypeRoutes } from './routes/HouseTypeRoute';
import { visitRoutes } from './routes/VisitsRoutes';
import {ratingRoutes} from "./routes/RatingRoutes";


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
  server.register(favoriteRoutes, { prefix: "/users" });
  server.register(ratingRoutes, { prefix: "/api" });

  server.register(houseTypeRoutes);
  server.register(visitRoutes);

  try {
    await server.listen({ port: 3000, host: '0.0.0.0' });
    console.log('Server listening on port 3000');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}
main();
