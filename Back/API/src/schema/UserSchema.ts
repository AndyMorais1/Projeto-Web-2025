import zod from 'zod';

export const CreateUserSchema = zod.object({
    name: zod.string(),
    email: zod.string({
        required_error: 'Email é obrigatório',
        invalid_type_error: 'Email invalido',
    }).email(),
    password: zod.string(),
    phone: zod.string().optional(),
    role: zod.enum(['CLIENT', 'ADMIN', 'AGENT']).default('CLIENT'),
});

export const UpdateUserSchema = zod.object({
    name: zod.string().optional(),
    email: zod.string({
        required_error: 'Email é obrigatório',
        invalid_type_error: 'Email inválido',
    }).email().optional(),
    password: zod.string().optional(),
    phone: zod.string().optional(),
    role: zod.enum(['CLIENT', 'ADMIN', 'AGENT']).optional(),
    status: zod.enum(['ACTIVE', 'INACTIVE','PENDING']).optional(),
    photo: zod.string().optional(),
});

export const ResponseUserSchema = zod.object({
    id: zod.string().optional(),
    name: zod.string().optional(),
    email: zod.union([zod.string({
        required_error: 'Email é obrigatório',
        invalid_type_error: 'Email invalido',
    }).email(), zod.null()]).optional(),  // Permitir null aqui
    phone: zod.union([zod.string(), zod.null()]).optional(),
    role: zod.enum(['CLIENT', 'ADMIN', 'AGENT']).optional(),
    photo: zod.union([zod.string(), zod.null()]).optional(),
    houses: zod.array(zod.string()).optional(),
    createdAt: zod.date(),
});

export const LoginSchema = zod.object({
    email: zod.string({
        required_error: 'Email é obrigatório',
        invalid_type_error: 'Email inválido',
    }).email(),
    password: zod.string(),
});

export const LoginAdminSchema = zod.object({
    name: zod.string(),
    password: zod.string(),
});

export const LoginResponseSchema = zod.object({
    token: zod.string(),
});

export type CreateUserSchema = zod.infer<typeof CreateUserSchema>;
export type UpdateUserSchema = zod.infer<typeof UpdateUserSchema>;
export type ResponseUserSchema = zod.infer<typeof ResponseUserSchema>;
export type LoginSchema = zod.infer<typeof LoginSchema>;
export type LoginResponseSchema = zod.infer<typeof LoginResponseSchema>;