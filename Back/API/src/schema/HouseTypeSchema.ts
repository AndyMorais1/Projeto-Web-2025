// src/schema/HouseTypeSchema.ts
import z from 'zod';

export const CreateHouseTypeSchema = z.object({
    name: z.string().min(3).max(50),
});

export const UpdateHouseTypeSchema = z.object({
    name: z.string().min(3).max(50),
});

export type CreateHouseTypeInput = z.infer<typeof CreateHouseTypeSchema>;
export type UpdateHouseTypeInput = z.infer<typeof UpdateHouseTypeSchema>;
