import { StatusCheckout } from "../enums/statusCheckout";

export interface Checkout {

    id: number;
    itens: string[];
    nomeCliente: string;
    valorTotal: number;
    status: StatusCheckout;

}