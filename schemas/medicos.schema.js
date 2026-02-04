import z   from 'zod'
import { id } from 'zod/locales'

const medicoSchema = z.object({
    id: z.number().positive(),
    nombre: z.string().min(2).max(100),
    cedula: z.string().min(5).max(20),
    email: z.string().email().max(100),
    password: z.string().min(8).max(100),
    googleCalendarId: z.string().max(255).optional(),
})

export function validateMedico (input) {
    return medicoSchema.safeParse(input)
}

export function validatePartialMedico (input) {
    return medicoSchema.partial().safeParse(input)
}