import { useState } from "react";
import type { IProduct } from "../../types/product.interface";
import Modal from "../molecules/Modal";
import Button from "../atoms/Button";
import ProductImageSlider from "../molecules/ProductImageSlider";

interface ProductDisplayModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: IProduct | null;
}

const ProductDisplayModal = ({ isOpen, onClose, product }: ProductDisplayModalProps) => {
    const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});
    const [quantity, setQuantity] = useState(1);

    if (!product) return null;

    const handleAttributeChange = (attributeName: string, value: string) => {
        setSelectedAttributes((prev) => ({
            ...prev,
            [attributeName]: value,
        }));
    };

    const handleBuyNow = () => {
        const selectedCombo = product.variantCombinations?.find(
            (combo) =>
                JSON.stringify(combo.attributes) === JSON.stringify(selectedAttributes)
        );
        const selectedProduct = selectedCombo?.product || product;

        console.log("Buying", {
            product: selectedProduct,
            quantity,
        });
        // Your purchase logic here
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="w-screen max-w-4xl h-[400px] max-h-[90vh] overflow-y-auto flex flex-col md:flex-row gap-6">
                {/* Left side image */}
                <div className="md:w-1/2">
                   <ProductImageSlider images={product.images} />
                </div>

                {/* Right side details */}
                <div className="md:w-1/2 flex flex-col justify-between">
                    {/* Product title and description */}
                    <div>                        
                        <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
                        <p className="text-muted-foreground mb-4">{product.description}</p>

                        {/* Variant selectors */}
                        {product.variantAttributes?.map((attr) => (
                            <div key={attr.name} className="mb-4">
                                <label className="block font-medium mb-1">{attr.name}</label>
                                <div className="flex flex-wrap gap-2">
                                    {attr.values.map((value) => (
                                        <button
                                            key={value}
                                            onClick={() => handleAttributeChange(attr.name, value)}
                                            className={`px-3 py-1 border rounded ${selectedAttributes[attr.name] === value
                                                    ? "bg-accent text-white"
                                                    : "hover:bg-muted"
                                                }`}
                                        >
                                            {value}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* Quantity selector */}
                        <div className="mb-4">
                            <label className="block font-medium mb-1">Quantity</label>
                            <input
                                type="number"
                                min={1}
                                max={product.stock}
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                className="border px-3 py-1 w-24 rounded"
                            />
                        </div>
                    </div>                

                    {/* Buy now button */}
                    <Button onClick={handleBuyNow} className="w-full">
                        Buy Now
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ProductDisplayModal;
