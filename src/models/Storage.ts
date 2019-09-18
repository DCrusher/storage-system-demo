import { ProductIdWithQuantity } from "./StorageProduct";

export default interface Storage {
  id: string;
  name: string;
}

export interface StorageWithProducts extends Storage {
  products: ProductIdWithQuantity[];
}
