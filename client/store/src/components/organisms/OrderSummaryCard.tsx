import type { IItem } from "../../types/item.interface";
import ItemCard from "../molecules/ItemCard";

interface OrderSummaryCardProps {
    items: IItem[];
    totalAmount: number;
}

const OrderSummaryCard = ({items, totalAmount}: OrderSummaryCardProps) => {
    return (
        <div className="bg-surface p-6 w-full">
            <h1 className="text-xl font-semibold mb-4">Order Summary</h1>
            <div className="space-y-4">
                {items.map((item, idx) => (
                    <ItemCard item={item} key={idx} />
                ))}
            </div>

            <div className="mt-6 text-lg font-bold flex justify-between">
                <span>Total:</span>
                <span>₹{totalAmount.toFixed(2)}</span>
            </div>
        </div>
    );
}

export default OrderSummaryCard;
