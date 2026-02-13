import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import { adminRouter } from './routes/routes.js';
import { medicoRouter } from './routes/routes.js';
import { authRouter } from './routes/routes.js';

dotenv.config();

const app = express();
app.use(cookieParser())

app.use(express.json());
app.disable('x-powered-by'); // deshabilitar el header X-Powered-By: Express

app.use('/api/login', authRouter)
app.use('/api/admin', adminRouter)
app.use('/api/medico', medicoRouter)



const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
