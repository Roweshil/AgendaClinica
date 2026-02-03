import z   from 'zod'
import { id } from 'zod/locales'

const medicoSchema = z.object({
    id: z.number().positive(),
    nombre: z.string().min(2).max(100),
    cedula: z.string().min(5).max(20),
    especialidad: z.string().min(2).max(100),
    telefono: z.string().min(7).max(15),
    email: z.string().email().max(100),
})