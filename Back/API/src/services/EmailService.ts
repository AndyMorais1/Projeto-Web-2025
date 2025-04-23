import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    logger: true,
    debug: true,
});

export async function sendVerificationEmail(email: string, token: string) {
    const verificationUrl = `http://localhost:3000/users/users/verify-email?token=${token}`;

    await transporter.sendMail({
        from: `"SpotHome" <${process.env.EMAIL_USER}>`, // Nome ajuda a evitar spam
        to: email,
        subject: 'Confirme seu e-mail para acessar nosso site',
        text: `Olá, obrigado por se cadastrar! Confirme seu e-mail clicando no link: ${verificationUrl}`,
        html: `
            <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                <h2 style="color: #1aa3ff;">Confirmação de E-mail</h2>
                <p>Olá,</p>
                <p>Obrigado por se cadastrar! Clique no botão abaixo para confirmar seu e-mail:</p>
                <p style="text-align: center;">
                    <a href="${verificationUrl}" 
                       style="display: inline-block; padding: 12px 20px; color: white; background-color: #1aa3ff; text-decoration: none; border-radius: 5px; font-size: 16px;">
                       Confirmar E-mail
                    </a>
                </p>
                <p>Se você não solicitou este cadastro, ignore este e-mail.</p>
                <p>Atenciosamente,<br><strong>Equipe Spot Home!</strong></p>
            </div>
        `,
    });

    console.log('E-mail enviado com sucesso!');
}


export async function sendWaitAgentEmail(email: string) {
    // Lê o conteúdo do arquivo HTML
    const emailTemplatePath = path.join(__dirname, '..', 'html', 'wait.html');
    const emailHtml = fs.readFileSync(emailTemplatePath, 'utf-8');

    await transporter.sendMail({
        from: `"SpotHome" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Aguarde a aprovação do seu cadastro',
        text: `Olá, obrigado por se cadastrar! Aguarde a aprovação do seu cadastro.`,
        html: emailHtml, // Usa o HTML carregado do arquivo
    });
}


export async function sendApprovedAgentEmail(email: string) {
    // Lê o conteúdo do arquivo HTML
    const emailTemplatePath = path.join(__dirname, '..', 'html', 'approved.html');
    const emailHtml = fs.readFileSync(emailTemplatePath, 'utf-8');

    await transporter.sendMail({
        from: `"SpotHome" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Cadastro aprovado!',
        text: `Olá, seu cadastro para Agente foi aprovado! Agora você pode acessar nossa plataforma.`,
        html: emailHtml, // Usa o HTML carregado do arquivo
    });

    console.log('E-mail de aprovação enviado com sucesso!');
}