import { createDomain } from "effector";
import uuid from "uuid";

import Product, { ProductByStorages } from "models/Product";
import ProductService from "services/ProductService";
import {
  addAllocation,
  changeAllocationForProduct
} from "store/storagesProducts";

const ProductDomain = createDomain();

export const createProduct = ProductDomain.effect<
  ProductByStorages,
  ProductByStorages,
  Error
>();
export const updateProduct = ProductDomain.effect<
  ProductByStorages,
  ProductByStorages,
  Error
>();
export const deleteProduct = ProductDomain.effect<Product, Product, Error>();

createProduct.use(ProductService.createProduct);
updateProduct.use(ProductService.updateProduct);
deleteProduct.use(ProductService.deleteProduct);

const initialState: Product[] = [
  {
    id: uuid(),
    name: "product 1"
  }
];

export interface ProductState {
  storages: Product[];
}

export const ProductsStore = ProductDomain.store<Product[]>(initialState)
  .on(createProduct.done, (state, { result }) => {
    const { storages, ...product } = result;

    console.log(result);

    storages &&
      storages.forEach(({ storageId, quantity }: any) => {
        addAllocation({
          productId: product.id,
          storageId,
          quantity
        });
      });

    return [...state, product];
  })
  .on(updateProduct.done, (state, { result }) => {
    const { storages, ...product } = result;

    changeAllocationForProduct(result);

    const storagesWithoutUpdated = state.filter(
      product => product.id !== result.id
    );
    return [...storagesWithoutUpdated, product];
  })
  .on(deleteProduct.done, (state, { result }) =>
    state.filter(product => product.id !== result.id)
  );
