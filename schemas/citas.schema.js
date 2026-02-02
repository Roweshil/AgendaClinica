import z from 'zod'

const agendaSchema = z.object({
    medicoId: z.number().positive(),
    fecha: z.string().date(),
    hora: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
    paciente: z.string().min(2).max(100),
    motivo: z.string().min(2).max(255),
})

