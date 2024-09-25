import express from 'express';
import { PaymentController } from '../controllers/paymentController';

const router = express.Router();

/**
 * @swagger
 * /api/pagamento:
 *   post:
 *     summary: Processa um pagamento
 *     description: Confirma ou cancela o pagamento de um pedido.
 *     parameters:
 *       - in: body
 *         name: Pagamento
 *         description: Informações do pagamento.
 *         schema:
 *           type: object
 *           required:
 *             - checkoutId
 *             - isPaymentConfirmed
 *             - payment
 *           properties:
 *             checkoutId:
 *               type: number
 *               example: 1
 *             isPaymentConfirmed:
 *               type: boolean
 *               example: true
 *             payment:
 *               type: object
 *               required:
 *                 - checkoutId
 *                 - valorTotal
 *                 - status
 *                 - createdAt
 *                 - updatedAt
 *               properties:
 *                 checkoutId:
 *                   type: number
 *                   example: 1
 *                 valorTotal:
 *                   type: number
 *                   format: float
 *                   example: 100.00
 *                 status:
 *                   type: string
 *                   enum: [SUCESSO, FALHA]
 *                   example: SUCESSO
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-09-24 13:52:00"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-09-24 13:52:00"
 *     responses:
 *       200:
 *         description: Pagamento processado com sucesso.
 *       500:
 *         description: Erro ao processar o pagamento.
 */
router.post('/pagamento', PaymentController);

export default router;