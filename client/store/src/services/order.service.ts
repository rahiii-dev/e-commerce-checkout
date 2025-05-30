import axios from "../lib/axios"
import type { IOrder } from "../types/order.interface";

export const orderService = {
    async getOrderById(orderId: string): Promise<IOrder> {
        const response = await axios.get<IOrder>(`/order/${orderId}`);
        return response.data;
    },
}