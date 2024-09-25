import { PaymentStatus } from "../enums/PaymentStatus";

export interface Payment {

    id: number;
    checkoutId: number;
    valorTotal: number;
    status: PaymentStatus;
    createdAt: Date;               
    updatedAt: Date;
}