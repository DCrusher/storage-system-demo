export default interface StorageProduct {
  storageId: string;
  productId: string;
  quantity: number;
}

export interface ProductIdWithQuantity {
  productId: string;
  quantity: number;
}
