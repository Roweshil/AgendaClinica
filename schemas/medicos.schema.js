import z   from 'zod'

const medicoSchema = z.object({
    nombre: z.string().min(2).max(100),
    email: z.string().max(100),
    password: z.string().min(8).max(100),
    googleCalendarId: z.string().max(255).optional(),
})

export function validateMedico (input) {
    return medicoSchema.safeParse(input)
}

export function validatePartialMedico (input) {
    return medicoSchema.partial().safeParse(input)
}