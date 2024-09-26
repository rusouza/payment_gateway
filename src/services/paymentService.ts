import connection from '../config/database';
import { Checkout } from '../models/checkout';
import { Payment } from '../models/payment';
import { StatusCheckout } from '../enums/statusCheckout';

export class PaymentService {
    constructor() { }

    async processPayment(checkoutId: number, isConfirmed: boolean, payment: Payment) {
        try {
            console.log('aqui 1')
            const checkout: any = await this.getCheckoutById(checkoutId);
            
            if(!checkout) {
                throw new Error('Checkout não encontrado.');
            }
    
            if(isConfirmed) {
                // Atualiza o status para "Confirmado"
                await this.updateCheckoutStatus(checkoutId, StatusCheckout.CONCLUIDO);
                await this.paymentConfirmed(payment);
                return { message: 'Pagamento confirmado com sucesso!' };
            } else {
                // Atualiza o status para "Cancelado"
                await this.updateCheckoutStatus(checkoutId, StatusCheckout.CANCELADO);
                await this.paymentConfirmed(payment);
                return { message: 'Pagamento falhou. Checkout cancelado.' }
            }
        } catch (e) {
            throw new Error(`Erro ao processar o pagamento: ${(e as Error).message}`);
        }
    }

    getCheckoutById(checkoutId: number) {
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
    }

    updateCheckoutStatus(checkoutId: number, status: string) {
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
    }

    paymentConfirmed(payment: Payment) {
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
    }
}