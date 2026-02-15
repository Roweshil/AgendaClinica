import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import adminRouter from './routes/privada/admin.routes.js'
import medicoRouter from './routes/privada/medico.routes.js'
import authRouter from './routes/publica/routes.js'
import authMiddleware from './middlewares/authMiddleware.js'
import rolesAutorizados  from './middlewares/roleMiddleware.js'

dotenv.config()

const app = express()
app.use(cookieParser())

app.use(express.json())
app.disable('x-powered-by') // deshabilitar el header X-Powered-By: Express

app.use('/api/', authRouter)
app.use('/api/admin', authMiddleware, rolesAutorizados('admin'), adminRouter)
app.use('/api/medico', authMiddleware,rolesAutorizados('admin', 'medico'), medicoRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
