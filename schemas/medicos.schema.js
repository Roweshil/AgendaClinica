import z   from 'zod'

const medicoSchema = z.object({
    nombre: z.string().min(2).max(100),
    apellido: z.string().min(2).max(100),
    telefono: z.string().min(10).max(20),
    email: z.string().max(100),
    password: z.string().min(8).max(50)
})

const passwordUpdateSchema = z.object({
    uuid: z.string(),
    password: z.string({
        invalid_type_error: 'La contraseña debe ser un string',
        required_error: 'La contraseña es requerida'
    }).min(8).max(50)
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