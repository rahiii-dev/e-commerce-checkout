import type { IItem } from "../../types/item.interface";

interface ItemCardProps {
    item: IItem;
}

const ItemCard = ({ item }: ItemCardProps) => {
    const { name, image, quantity, price, subtotal, variantAttributes={} } = item;
    const attrs = variantAttributes instanceof Map
            ? Object.fromEntries(variantAttributes.entries())
            : variantAttributes;

    return (
        <div className="flex items-start gap-4 border-1 border-gray-600 p-4 rounded relative">
            <div className="relative">
                {image ? (
                    <img
                        src={image}
                        alt={name}
                        className="w-20 h-20 object-cover rounded"
                    />
                ) : (
                    <div className="w-20 h-20 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">
                        No Image
                    </div>
                )}
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                    {quantity}
                </span>
            </div>

            <div className="flex-1">
                <div className="font-medium">{name}</div>
                <div className="text-sm text-muted-foreground">
                    {Object.entries(attrs)
                        .map(([key, value]) => `${key}: ${value}`)
                        .join(", ")}
                </div>
            </div>

            <div className="text-sm text-right">
                <div>₹{price.toFixed(2)}</div>
            </div>

            <div className="absolute bottom-[5px] right-4 text-muted-foreground">
                Subtotal: ₹{subtotal.toFixed(2)}
            </div>
        </div>
    );
};

export default ItemCard;
