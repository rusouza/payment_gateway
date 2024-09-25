import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import paymentRoutes from './routes/paymentRoutes';
import './config/database';
import { setupSwagger } from './config/swagger';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Rotas
app.use('/api', paymentRoutes);

// Setup do Swagger
setupSwagger(app);

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor de pagamento rodando em http://localhost:${PORT}`);
});