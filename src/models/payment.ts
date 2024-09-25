import { PaymentStatus } from "../enums/paymentStatus";

export interface Payment {

    id: number;
    checkoutId: number;
    valorTotal: number;
    status: PaymentStatus;
    createdAt: Date;               
    updatedAt: Date;
}