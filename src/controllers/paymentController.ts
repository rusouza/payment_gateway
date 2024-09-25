import { Request, Response } from 'express';
import  { processPayment } from '../services/paymentService';

export const PaymentController = async (req: Request, res: Response) => {
    const { checkoutId, isPaymentConfirmed, payment } = req.body;

    try {
        const result = await processPayment(checkoutId, isPaymentConfirmed, payment);
        res.status(200).json(result);
    } catch (e) {
        res.status(500).json({ error: (e as Error).message });
    }
};