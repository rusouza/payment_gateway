import  { PaymentService } from '../src/services/paymentService';
import { PaymentStatus } from '../src/enums/paymentStatus';
import { StatusCheckout } from '../src/enums/statusCheckout';
import { Payment } from '../src/models/payment';

// Mockando as funções que serão usadas no teste
jest.mock('../src/config/database.ts', () => ({
    query: jest.fn().mockImplementation((query, params, callback) => {
      callback(null, []);
    }),
}));

describe('Pagamento Service', () => {
    const service = new PaymentService();

    const mockCheckout = {
        id:  1,
        itens: ['item1', 'item2'],
        nomeCliente: 'Cliente Teste',
        valorTotal: 100.00,
        status: StatusCheckout.CONCLUIDO
    };

    const mockCheckoutCancelado = {
        id:  1,
        itens: ['item1', 'item2'],
        nomeCliente: 'Cliente Teste',
        valorTotal: 100.00,
        status: StatusCheckout.CANCELADO
    };

    const paymentSuccess: Payment = {
        id: 1,
        checkoutId: 1,
        valorTotal: 100.00,
        status: PaymentStatus.FALHA,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    const paymentFaield: Payment = {
        id: 1,
        checkoutId: 1,
        valorTotal: 100.00,
        status: PaymentStatus.FALHA,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    beforeEach(() => {
        // Resetando os mocks antes de cada teste
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.clearAllTimers();
    });

    it('should confirm the payment successfully', async () => {

        // Mockando as funções
        jest.spyOn(service, 'getCheckoutById').mockResolvedValue(mockCheckout);
        jest.spyOn(service, 'updateCheckoutStatus').mockResolvedValue();
        jest.spyOn(service, 'paymentConfirmed').mockResolvedValue();

        const result = await service.processPayment(mockCheckout.id, true, paymentSuccess);

        // Verifica se o pagamento foi confirmado
        expect(result).toEqual({ message: 'Pagamento confirmado com sucesso!' });
    });

    it('should cancel the payment if not confirmed', async () => {
        
        // Mockando as funções
        jest.spyOn(service, 'getCheckoutById').mockResolvedValue(mockCheckout);
        jest.spyOn(service, 'updateCheckoutStatus').mockResolvedValue();
        jest.spyOn(service, 'paymentConfirmed').mockResolvedValue();

        const result = await service.processPayment(mockCheckoutCancelado.id, false, paymentFaield);

        // Verifica se o pagamento foi cancelado
        expect(result).toEqual({ message: 'Pagamento falhou. Checkout cancelado.' });
    });

    it('should throw an error if checkout is not found', async () => {
        // Mockando as funções
        jest.spyOn(service, 'getCheckoutById').mockResolvedValue(null);

        await expect(service.processPayment(999, true, paymentFaield)).rejects.toThrow('Checkout não encontrado.');
    });
});