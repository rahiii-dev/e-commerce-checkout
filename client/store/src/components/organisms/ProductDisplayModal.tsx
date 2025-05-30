import { useEffect, useState } from "react";
import type { IBaseProduct, IProduct } from "../../types/product.interface";
import Modal from "../molecules/Modal";
import Button from "../atoms/Button";
import ProductImageSlider from "../molecules/ProductImageSlider";
import { useNavigate } from "react-router-dom";
import { checkoutService } from "../../services/checkout.service";
import { toast } from "sonner";
import { handleError } from "../../utils/helper";
import Loader from "../atoms/Loader";

interface ProductDisplayModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: IProduct | null;
}

interface ActiveAttributes {
    name: string;
    values: {
        value: string;
        isActive: boolean;
    }[]
}

interface SelectedVariant extends IBaseProduct {
    productId: string;
    attributes?: Record<string, string>;
}

const EXCLUDED_ATTRIBUTES = new Set(["Color"])

const ProductDisplayModal = ({ isOpen, onClose, product }: ProductDisplayModalProps) => {
    const [activeAttributes, setActiveAttributes] = useState<ActiveAttributes[]>([]);
    const [selectedVariant, setSelectedVariant] = useState<SelectedVariant | null>(null);
    const [buyingVariant, setBuyingVariant] = useState<SelectedVariant | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [processing, setProcessing] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (!product) return;

        setQuantity(1);

        if (product.variantCombinations && product.variantCombinations.length > 0) {
            const firstCombination = product.variantCombinations[0];
            const variant = { ...firstCombination.product, attributes: firstCombination.attributes, productId: product.id };
            setSelectedVariant(variant);
            setBuyingVariant(variant);
        } else {
            const variant = {
                productId: product.id,
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                images: product.images,
                stock: product.stock
            };
            setSelectedVariant(variant);
            setBuyingVariant(variant);
        }
    }, [product]);


    useEffect(() => {
        if (!product || !selectedVariant || !product.variantAttributes) return;

        const attributesMap: Record<string, ActiveAttributes> = {};

        product.variantAttributes.forEach(attr => {
            attributesMap[attr.name] = {
                name: attr.name,
                values: attr.values.map(value => ({ value, isActive: EXCLUDED_ATTRIBUTES.has(attr.name) || false }))
            };
        })

        // Find Active Attributes
        if (product.variantCombinations && product.variantCombinations.length > 0) {
            product.variantCombinations.forEach(combo => {
                if (combo.product.stock && combo.product.stock <= 0) return;
                if (selectedVariant && selectedVariant.id !== combo.product.id) return;

                Object.entries(combo.attributes).forEach(([attrName, attrValue]) => {
                    if (!EXCLUDED_ATTRIBUTES.has(attrName) && attrName in attributesMap) {
                        attributesMap[attrName].values.forEach(valueObj => {
                            if (valueObj.value === attrValue) {
                                valueObj.isActive = true;
                            }
                        })
                    }
                })
            })

        }

        setActiveAttributes(Object.values(attributesMap));
    }, [selectedVariant])

    if (!selectedVariant) return null;


    const handleAttributeChange = (attributeName: string, value: string) => {
        if (!selectedVariant || !product || !product.variantCombinations || !product.variantAttributes) return;

        const matchingVariant = product.variantCombinations.find(combo =>
            combo.attributes[attributeName] === value
        );

        if (matchingVariant) {
            const variant = { ...matchingVariant.product, attributes: matchingVariant.attributes, productId: product.id };
            setSelectedVariant(variant);
            setBuyingVariant(variant);
        } else {
            const variant = selectedVariant;
            delete variant.attributes;
            setSelectedVariant(variant);
            const attributes = product.variantAttributes.map(attr => ({
                name: attr.name,
                values: attr.values.map(value => ({ value, isActive: EXCLUDED_ATTRIBUTES.has(attr.name) || false }))
            }));
            setActiveAttributes(attributes);
            setBuyingVariant(null);
        }

        setQuantity(1);
    };


    const handleBuyNow = async () => {
        if(!buyingVariant) return;
        
        setProcessing(true);

        try {
            const session = await checkoutService.createSession({
                items: [{
                id: buyingVariant.id,
                productId: buyingVariant.productId,
                attributes: buyingVariant.attributes,
                quantity
            }]
            })

           navigate(`/checkout/${session.sessionId}`)
        } catch (error) {
            toast(handleError(error, "Failed to proceed to checkout"));
        } finally {
            setProcessing(false);
        }
    };

    const onCloseHandler = () => {
        setSelectedVariant(null);
        setBuyingVariant(null);
        setActiveAttributes([]);
        setQuantity(1);
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onClose={onCloseHandler}>
            <div className="w-screen max-w-[90vw] lg:max-w-4xl h-[400px] max-h-[90vh] overflow-y-auto flex flex-col md:flex-row gap-6">
                {/* Left side image */}
                <div className="md:w-1/2">
                    <ProductImageSlider images={selectedVariant.images} />
                </div>

                {/* Right side details */}
                <div className="md:w-1/2 flex flex-col justify-between">
                    {/* Product title and description */}
                    <div>
                        <h2 className="text-2xl font-bold mb-2">{selectedVariant.name}</h2>
                        <p className="text-muted-foreground mb-4">{selectedVariant.description}</p>

                        {/* Variant selectors */}
                        {activeAttributes?.map((attr) => (
                            <div key={attr.name} className="mb-4">
                                <label className="block font-medium mb-1">{attr.name}</label>
                                <div className="flex flex-wrap gap-2">
                                    {attr.values.map((value) => (
                                        <Button
                                            key={value.value}
                                            variant={selectedVariant?.attributes?.[attr.name] === value.value ? "primary" : "outline"}
                                            onClick={() => handleAttributeChange(attr.name, value.value)}
                                            disabled={!value.isActive}
                                        >
                                            {value.value}
                                        </Button>
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
                                max={selectedVariant.stock}
                                value={quantity}
                                onChange={(e) => {
                                    const val = Math.min(Number(e.target.value), selectedVariant.stock);
                                    setQuantity(Math.max(1, val));
                                }}

                                className="border px-3 py-1 w-24 rounded"
                            />
                        </div>
                    </div>

                    {/* Buy now button */}
                    <Button
                        onClick={handleBuyNow}
                        className="w-full cursor-pointer"
                        disabled={!buyingVariant || buyingVariant.stock <= 0 || quantity > buyingVariant.stock}
                    >
                        {processing ? <Loader /> : "Buy Now"}
                    </Button>

                </div>
            </div>
        </Modal>
    );
};

export default ProductDisplayModal;
