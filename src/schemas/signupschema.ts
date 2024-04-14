import {z} from 'zod'

export const SignupSchema = z.object({
    username: z.string()
    .min(3,"username must be at least 3 characters long")
    .max(15,"username must be at most 15 characters long"),
    email: z.string()
    .email({message:"invalid email"})
    .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"invalid email"),
    password: z.string().min(8,{message:"password length 8 required"}),
})