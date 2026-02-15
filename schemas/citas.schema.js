import z, { uuid } from 'zod'

const citaSchema = z.object({
    medico_Id: z.string({
        invalid_type_error: 'id debe ser string',
        required_error: 'el id es requerido'
    }),
    fecha: z.string({
        invalid_type_error: 'fecha debe ser en formato string',
        required_error: 'fecha es requerida'
    }),
    hora: z.string({
        invalid_type_error: 'la hora es necesaria',
        required_error: 'hora es requerida'
    }),
    paciente: z.string().min(2).max(100),
    motivo: z.string().min(2).max(255),
    google_event_id: z.string().optional(),
    estado: z.string().min(2).max(50),
})



export function validateCita(input) {
    return citaSchema.safeParse(input)
}

export function validatePartialCita(input) {
    return citaSchema.partial().safeParse(input)
}






        