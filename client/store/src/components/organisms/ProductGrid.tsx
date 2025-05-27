import { useEffect, useState } from "react";
import ProductGridLayout from "../templates/ProductGridLayout";
import ProductCardWithActions from "./ProductCardWithActions";
import productsData from "../../data/products.json";
import type { IProduct } from "../../types/product.interface";

const ProductGrid = () => {
    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        setProducts(productsData as IProduct[]);
    }, []);

    return (
        <ProductGridLayout>
            {products.map((product) => (
                <ProductCardWithActions
                    key={product.id}
                    product={product}
                />
            ))}
        </ProductGridLayout>
    );
}

export default ProductGrid;
