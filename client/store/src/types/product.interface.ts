export interface IBaseProduct {
  id: string;
  name: string;
  description: string;
  price: number;                 
  images: string[];
  stock: number;   
}

export interface VariantAttribute {
  name: "Color" | "Size";           
  values: string[];               
}

export interface VariantCombination {
  attributes: Record<string, string>;
  product: IBaseProduct;
}

export interface IProduct extends IBaseProduct {               
  variantAttributes?: VariantAttribute[];           
  variantCombinations?: VariantCombination[];      
}

