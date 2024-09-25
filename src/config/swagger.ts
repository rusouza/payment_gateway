import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

// Configurações do Swagger
const options = {
    definition: {
        openai: '3.0.0',
        info: {
            title: 'API de Pagamento',
            version: '1.0.0',
            description: 'Documentação da API de pagamentos do microserviço',
        },
    },
    // Caminho para os arquivos onde estão as rotas
    apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log('Swagger rodando em http://localhost:3000/api-docs');
};