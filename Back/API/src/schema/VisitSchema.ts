import z from 'zod';

export const CreateVisitSchema = z.object({
  clientId: z.string().uuid(),
  houseId: z.string().uuid(),
  date: z.date().min(new Date(), "Data deve ser maior que a data atual"),
});
export type CreateVisitSchema = z.infer<typeof CreateVisitSchema>;