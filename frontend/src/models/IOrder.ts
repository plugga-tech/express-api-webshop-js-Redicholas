import { ICartProduct } from './ICartProduct';

export interface IOrder {
    user: string;
    products: ICartProduct[];
}