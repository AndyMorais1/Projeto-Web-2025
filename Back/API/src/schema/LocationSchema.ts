import z from 'zod';

export const CreateLocationSchema = z.object({
    address: z.string().min(1, "Endereço deve ter pelo menos 1 caractere"),
    city: z.string().min(1, "Cidade deve ter pelo menos 1 caractere"),
    zipCode: z.string().min(1, "CEP deve ter pelo menos 1 caractere"),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
});
export type CreateLocationSchema = z.infer<typeof CreateLocationSchema>;