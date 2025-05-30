import type { IItem } from "./item.interface";

export interface IAddress {
    fullName: string,
    addressLine1: string,
    city: string,
    state: string,
    zipCode: string,
    country: string,
    phone: string,
}

export interface IOrder {
    id: string;
    orderId: string;
    email: string;
    items: IItem[];
    shippingAddress: IAddress;
    paymentMethod: string;
    totalAmount: number;
}