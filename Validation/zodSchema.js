import {z} from 'zod';

export const zodValSchema = z.object({
    name: z.string().min(1,{message: "Invalid name input"}),
    email: z.string().email({message: "Invalid mail input"}),
    age: z.coerce.number().min(18,{message: "Invalid age input"}),
    contact: z.string().regex(/^\d{10}$/,{message: "Invalid contact input"}),
    password: z.string().min(8,{message: "Invalid password input"})
})