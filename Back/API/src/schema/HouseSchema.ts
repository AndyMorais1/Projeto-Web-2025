import z from 'zod';
import{ CreateLocationSchema } from './LocationSchema';
import{ HouseDetailsSchema } from './HouseDetailsSchema';
import{ CreateVisitSchema } from './VisitSchema';
import { title } from 'process';

export const CreateHouseSchema = z.object({
  type: z.enum(["APARTMENT", "HOUSE","PENTHOUSE","DUPLEX","STUDIO"]),
  agentId: z.string().uuid(),
  location: CreateLocationSchema,
  title: z.string().min(5).max(100),
  description: z.string().min(5).max(1000),
  images: z.array(z.string().url()),
  details: HouseDetailsSchema,
  price: z.number().positive(),
  });

  export const UpdateHouseSchema = CreateHouseSchema.partial();
  
  export type CreateHouseSchema = z.infer<typeof CreateHouseSchema>;
  export type UpdateHouseSchema = z.infer<typeof UpdateHouseSchema>;