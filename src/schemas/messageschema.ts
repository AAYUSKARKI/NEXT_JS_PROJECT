import {z} from 'zod'

export const MessageSchema = z.object({
    content: z
    .string()
    .min(10,{message:"message must be at least 10 characters long"})
    .max(1000,{message:"message must be at most 1000 characters long"})
})