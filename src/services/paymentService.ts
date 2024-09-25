import connection from '../config/database';
import { Checkout } from '../models/checkout';
import { PaymentStatus } from '../enums/paymentStatus';
import { Payment } from '../models/payment';
import { StatusCheckout } from '../enums/statusCheckout';

// Função para buscar um checkout pelo ID
export const getCheckoutById = (checkoutId: number) => {
    return new Promise<Checkout | null>((resolve, reject) => {
        
        const query = 'SELECT * FROM checkouts WHERE id = ?';
        connection.query(query, [checkoutId], (err, results) => {

            if(err) {
                reject(err);
            } else {
                const rows = results as Checkout[];
                resolve(rows.length > 0 ? rows[0]: null);
            }
        })
    });
};

// Função para atualizar o status do checkout
export const updateCheckoutStatus = (checkoutId: number, status: string) => {
    return new Promise<void>((resolve, reject) => {

        const query = 'UPDATE checkouts SET status = ? WHERE id = ?';
        connection.query(query, [status, checkoutId], (err, results) => {

            if(err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

// Função para criar o pagamento
export const paymentConfirmed = (payment: Payment) => {
    return new Promise<void>((resolve, reject) => {
        
        const query = 'INSERT INTO payments (id, checkoutId, valorTotal, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)';
        const { id, checkoutId, valorTotal, status, createdAt, updatedAt } = payment;

        connection.query(query, [id, checkoutId, valorTotal, status, createdAt, updatedAt], (err, results) => {
            
            if(err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};


// Função que confirma ou cancela o pagamento
export const processPayment = async (checkoutId: number, isPaymentConfirmed: boolean, payment: Payment) => {
    try {
        const checkout: any = await getCheckoutById(checkoutId);

        if(!checkout) {
            throw new Error('Checkout não encontrado.');
        }

        if(isPaymentConfirmed) {
            // Atualiza o status para "Confirmado"
            await updateCheckoutStatus(checkoutId, StatusCheckout.CONCLUIDO);
            await paymentConfirmed(payment);
            return { message: 'Pagamento confirmado com sucesso!' };
        } else {
            // Atualiza o status para "Cancelado"
            await updateCheckoutStatus(checkoutId, StatusCheckout.CANCELADO);
            await paymentConfirmed(payment);
            return { message: 'Pagamento falhou. Checkout cancelado.' }
        }
    } catch (e) {
        throw new Error(`Erro ao processar o pagamento: ${(e as Error).message}`);
    }
};