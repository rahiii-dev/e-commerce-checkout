import { useEffect, useState } from "react";
import ProductGridLayout from "../templates/ProductGridLayout";
import type { IProduct } from "../../types/product.interface";
import ProductCard from "../molecules/ProductCard";
import Button from "../atoms/Button";
import ProductDisplayModal from "./ProductDisplayModal";
import { productService } from "../../services/product.service";
import Loader from "../atoms/Loader";
import Text from "../atoms/Text";

const ProductGrid = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        setLoading(true);
        productService
            .getProducts()
            .then((data) => {
                setProducts(data.products);
            })
            .catch(() => {
                setProducts([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleSelectProduct = (product: IProduct) => {
        setSelectedProduct(product);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedProduct(null);
    };

    return (
        <>
            {loading ? (
                <div className="h-[50vh] flex flex-col justify-center items-center gap-2">
                    <Loader size={30} />
                    <Text className="text-surface">Loading Products</Text>
                </div>
            ) : products.length > 0 ? (
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
                                <Button
                                    onClick={() => handleSelectProduct(product)}
                                    className="mt-4 w-full cursor-pointer"
                                >
                                    Buy Now
                                </Button>
                            </div>
                        </ProductCard>
                    ))}
                </ProductGridLayout>
            ) : (
                <Text className="text-gray-400">No products found.</Text>
            )}
            <ProductDisplayModal
                isOpen={modalOpen}
                onClose={handleCloseModal}
                product={selectedProduct}
            />

        </>
    );
};

export default ProductGrid;
