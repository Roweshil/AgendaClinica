import z   from 'zod'

const medicoSchema = z.object({
    nombre: z.string().min(2).max(100),
    email: z.string().max(100),
    password: z.string().min(8).max(100),
    googletoken: z.string().max(255).optional(),
})

const passwordUpdateSchema = z.object({
    password: z.string({
        invalid_type_error: 'La contraseña debe ser un string',
        required_error: 'La contraseña es requerida'
    }).min(8).max(100),
})

export function validateMedico (input) {
    return medicoSchema.safeParse(input)
}

export function validatePartialMedico (input) {
    return medicoSchema.partial().safeParse(input)
}

export function validatePasswordUpdate (input) {
    return passwordUpdateSchema.safeParse(input)
}