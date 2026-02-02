import express from 'express';
import dotenv from 'dotenv';
import { adminRouter } from './routes/routes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.disable('x-powered-by'); // deshabilitar el header X-Powered-By: Express

app.use('/admin', adminRouter);

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
