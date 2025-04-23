import z from 'zod';

export const HouseDetailsSchema = z.object({
    rooms: z.number().int().min(1, "Deve ter pelo menos 1 quarto"),
    bathrooms: z.number().int().min(1, "Deve ter pelo menos 1 banheiro"),
    area: z.number().positive("Área deve ser maior que 0"),
  });

export type HouseDetailsSchema = z.infer<typeof HouseDetailsSchema>;