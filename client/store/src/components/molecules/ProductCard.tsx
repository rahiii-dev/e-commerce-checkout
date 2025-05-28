import { Link } from "react-router-dom";
import Text from "../atoms/Text";


interface ProductCardProps {
    name: string;
    price: number;
    currency?: string;
    imageUrl: string;
    productUrl?: string;
    secondImageUrl?: string;
    children?: React.ReactNode;
}

const ProductCard = ({
    name,
    price,
    currency = "Rs.",
    imageUrl,
    productUrl,
    secondImageUrl,
    children,
}: ProductCardProps) => {
    return (
        <div className="w-full relative max-w-sm mx-auto border-white/10 rounded-2xl group bg-surface/70 backdrop-blur-md border overflow-hidden shadow-xl transition-transform transform hover:-translate-y-2 hover:shadow-primary/30 flex flex-col h-full">

            <Link to={productUrl || "#"} className="flex-1 flex flex-col">
                <div className="relative w-full h-56 overflow-hidden"
                    >
                    <img
                        src={imageUrl}
                        alt={name}
                        className={`absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 ${secondImageUrl ? "group-hover:opacity-0" : ""}`}
                    />
                    {secondImageUrl && (
                        <img
                            src={secondImageUrl}
                            alt={`${name} alt`}
                            className="absolute top-0 left-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        />
                    )}
                </div>

                <div className="p-4 flex-1 flex flex-col">
                    <Text as="h3" className="font-semibold truncate">{name}</Text>
                    <Text className="text-accent font-bold mt-1">
                        {currency}
                        {price.toFixed(2)}
                    </Text>
                </div>
            </Link>

            {children && <div className="p-4 pt-0">{children}</div>}
        </div>
    );
};

export default ProductCard;
