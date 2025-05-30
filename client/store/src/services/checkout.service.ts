import axios from "../lib/axios"
import type { ICheckout } from "../types/checkout.interface";
import type { IAddress, IOrder } from "../types/order.interface";

interface CreateSessionPayload {
    items: {
        id: string,
        productId: string,
        quantity: number,
        attributes?: Record<string, string>
    }[]
}

interface ConfirmCheckoutPayload {
    sessionId: string;
    email: string,
    address: IAddress,
    paymentDetails: {
        type: "cod" | "card";
        cardNumber?: string;
    }
}

export const checkoutService = {
    async createSession(data: CreateSessionPayload): Promise<{ sessionId: string }> {
        const response = await axios.post<{ sessionId: string }>("/checkout/session", data);
        return response.data;
    },
    async getSession(sessionId: string): Promise<ICheckout> {
        const response = await axios.get<ICheckout>(`/checkout/session/${sessionId}`);
        return response.data;
    },
    async confirmCheckout(data: ConfirmCheckoutPayload): Promise<IOrder> {
        const response = await axios.post<IOrder>(`/checkout/confirm-session`, data);
        return response.data;
    },
}