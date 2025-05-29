import axios from "../lib/axios"
import type { IProduct } from "../types/product.interface";

interface ProductListResponse {
    products: IProduct[];
    totalPages: number;
    currentPage: number;
}

export const productService = {
    async getProducts(page=1, limit=10): Promise<ProductListResponse> {
        const response = await axios.get<ProductListResponse>("/products", {params: {page, limit}});
        return response.data; 
    }
}