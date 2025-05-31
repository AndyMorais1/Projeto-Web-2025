// src/schemas/visit.schema.ts
import { z } from 'zod';

// Enum para status da visita
export const VisitStatusEnum = z.enum(['PENDING', 'CONFIRMED', 'REJECTED']);

// Schema para criar uma nova visita
export const CreateVisitSchema = z.object({
    clientId: z.string().uuid({ message: 'ID do cliente inválido' }),
    houseId: z.string().uuid({ message: 'ID da casa inválido' }),
    date: z.coerce.date({ message: 'Data inválida' }),
    message: z.string().max(500, { message: 'Mensagem muito longa (máx. 500 caracteres)' }).optional(),
});



// Schema para atualizar o status de uma visita
export const UpdateVisitStatusSchema = z.object({
    visitId: z.string().uuid({ message: 'ID da visita inválido' }),
    status: VisitStatusEnum,
});

// Schema para buscar uma visita por ID
export const VisitIdSchema = z.object({
    id: z.string().uuid({ message: 'ID inválido' }),
});
