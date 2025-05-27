import Button from "../atoms/Button";
import ProductCard from "../molecules/ProductCard";
import type { IProduct } from "../../types/product.interface";

interface ProductCardWithActionsProps {
  product: IProduct;
}

const ProductCardWithActions = ({ product }: ProductCardWithActionsProps) => {
  const handleBuyNow = () => {

  };

  return (
    <ProductCard
      name={product.name}
      description={product.description}
      price={product.price}
      imageUrl={product.images[0]}
      secondImageUrl={product.images[1]}
    >
      
      <div className="h-full">
        <Button onClick={handleBuyNow} className="mt-4 w-full">
          Buy Now
        </Button>
      </div>
    </ProductCard>
  );
};


export default ProductCardWithActions;


// {/* Variant Selector */}
// <label className="block text-sm text-white mt-3 mb-1">Variant</label>
// <select
//   value={selectedVariant}
//   onChange={(e) => setSelectedVariant(e.target.value)}
//   className="w-full p-2 rounded bg-background border border-white/20 text-white"
// >
//   {variants.map((variant) => (
//     <option key={variant} value={variant}>
//       {variant}
//     </option>
//   ))}
// </select>

// {/* Quantity Selector */}
// <label className="block text-sm text-white mt-3 mb-1">Quantity</label>
// <input
//   type="number"
//   min={1}
//   value={quantity}
//   onChange={(e) => setQuantity(Number(e.target.value))}
//   className="w-full p-2 rounded bg-background border border-white/20 text-white"
// />