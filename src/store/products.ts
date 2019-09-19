import { createDomain } from "effector";

import Product, { ProductByStorages } from "models/Product";
import ProductService from "services/ProductService";
import {
  addAllocation,
  changeAllocationForProduct,
  deleteAllocationForProduct
} from "store/storagesProducts";
import { seedProduct } from "utils/seeds";

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
  seedProduct({ name: "product 1", totalQuantity: 10 }),
  seedProduct({ name: "product 2", totalQuantity: 20 }),
  seedProduct({ name: "product 3", totalQuantity: 30 })
];

export interface ProductState {
  storages: Product[];
}

export const ProductsStore = ProductDomain.store<Product[]>(initialState)
  .on(createProduct.done, (state, { result }) => {
    const { storages, ...product } = result;

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
  .on(deleteProduct.done, (state, { result }) => {
    deleteAllocationForProduct({ id: result.id });

    return state.filter(product => product.id !== result.id);
  });
