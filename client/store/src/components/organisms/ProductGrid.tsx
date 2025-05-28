import { useEffect, useState } from "react";
import ProductGridLayout from "../templates/ProductGridLayout";
import productsData from "../../data/products.json";
import type { IProduct } from "../../types/product.interface";
import ProductCard from "../molecules/ProductCard";
import Button from "../atoms/Button";
import ProductDisplayModal from "./ProductDisplayModal";

const ProductGrid = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        setProducts(productsData as IProduct[]);
    }, []);

    const hanldeSelectProduct = (product: IProduct) => {
        setSelectedProduct(product);
        setModalOpen(true);
    }

    const handlCloseModal = () => {
        setModalOpen(false);
        setSelectedProduct(null);
    }

    return (
        <ProductGridLayout>
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    name={product.name}
                    price={product.price}
                    imageUrl={product.images[0]}
                    secondImageUrl={product.images[1]}
                >

                    <div className="h-full">
                        <Button onClick={() => hanldeSelectProduct(product)} className="mt-4 w-full cursor-pointer">
                            Buy Now
                        </Button>
                    </div>
                </ProductCard>
            ))}

            <ProductDisplayModal
                isOpen={modalOpen}
                onClose={handlCloseModal}
                product={selectedProduct}
            />
        </ProductGridLayout>
    );
}

export default ProductGrid;
