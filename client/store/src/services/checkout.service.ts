import axios from "../lib/axios"
import type { ICheckout } from "../types/checkout.interface";

interface CreateSessionPayload {
    items: {
        id: string, 
        productId: string, 
        quantity: number, 
        attributes?: Record<string, string>
    }[]
}
export const checkoutService = {
    async createSession(data: CreateSessionPayload): Promise<{sessionId: string}> {
        const response = await axios.post<{sessionId: string}>("/checkout/session", data);
        return response.data; 
    }, 
    async getSession(sessionId: string): Promise<ICheckout> {
        const response = await axios.get<ICheckout>(`/checkout/session/${sessionId}`);
        return response.data; 
    }, 
}