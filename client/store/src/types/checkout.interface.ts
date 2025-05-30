import type { IItem } from "./item.interface";

export interface ICheckout {
    items: IItem[];
    totalAmount: number;
    expiresAt: Date;
}