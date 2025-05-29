import type { IBaseProduct } from "./product.interface";

export interface ICheckoutItem extends IBaseProduct {
    quantity: number;
    subtotal: number;
    image: string;
    variantAttributes?: Record<string, string>;
}
export interface ICheckout {
    items: ICheckoutItem[];
    totalAmount: number;
    expiresAt: Date;
}