// src/routes/email.route.ts
import { FastifyInstance } from "fastify";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export async function emailRoutes(fastify: FastifyInstance) {
    fastify.post("/send", async (request, reply) => {
        const { to, subject, message } = request.body as {
            to: string;
            subject: string;
            message: string;
        };

        if (!to || !subject || !message) {
            return reply.status(400).send({ error: "Todos os campos são obrigatórios." });
        }

        try {
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            await transporter.sendMail({
                from: `"SpotHome" <${process.env.EMAIL_USER}>`,
                to,
                subject,
                text: message,
                html: `<p>${message}</p>`,
            });

            return reply.status(200).send({ success: true, message: "E-mail enviado com sucesso!" });
        } catch (error) {
            console.error("Erro ao enviar e-mail:", error);
            return reply.status(500).send({ error: "Erro ao enviar e-mail" });
        }
    });

    //

    fastify.post("/support", async (request, reply) => {
        const { from, name, message } = request.body as {
            from: string;
            name: string;
            message: string;
        };

        if (!from || !name || !message) {
            return reply.status(400).send({ error: "Todos os campos são obrigatórios." });
        }

        try {
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            await transporter.sendMail({
                from: `"${name}" <${from}>`,
                to: process.env.EMAIL_USER, // vai para o sistema (suporte)
                subject: `Mensagem de suporte de ${name}`,
                text: message,
                html: `
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${from}</p>
        <p><strong>Mensagem:</strong><br/>${message}</p>
      `,
            });

            return reply.status(200).send({ success: true, message: "Mensagem enviada ao suporte com sucesso!" });
        } catch (error) {
            console.error("Erro ao enviar mensagem de suporte:", error);
            return reply.status(500).send({ error: "Erro ao enviar mensagem para o suporte." });
        }
    });

}