import {z} from 'zod'

export const VerifySchema = z.object({
    code: z.string().length(6,"code length 6 required"),
})