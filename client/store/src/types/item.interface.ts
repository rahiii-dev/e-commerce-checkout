
export interface IItem {
    name: string;
    price: number;
    quantity: number;
    subtotal: number;
    image: string;
    variantAttributes?: Record<string, string>;
}