import { StorageIdWithQuantity } from "./StorageProduct";

export default interface Product {
  id: string;
  name: string;
  totalQuantity: number;
}

export interface ProductByStorages extends Product {
  storages: StorageIdWithQuantity[];
}
