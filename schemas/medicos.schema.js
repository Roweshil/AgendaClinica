import z   from 'zod'

const medicoSchema = z.object({
    nombre: z.string().min(2).max(100),


})