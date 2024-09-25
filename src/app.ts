import express from 'express';
import bodyParser from 'body-parser';
import paymentRoutes from './routes/paymentRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Rotas
app.use('/api', paymentRoutes);

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor de pagamento rodando em http://localhost:${PORT}`);
});