import uuid from "uuid";
import Product from "models/Product";

interface SeedProductArgs {
  name: string;
  totalQuantity: number;
}

export function seedProduct({ name, totalQuantity }: SeedProductArgs): Product {
  return {
    id: uuid(),
    name,
    totalQuantity
  };
}
