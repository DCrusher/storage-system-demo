import { createDomain } from "effector";
import uuid from "uuid";

import StorageProduct from "models/StorageProduct";
import { StorageWithProducts } from "models/Storage";
import { ProductByStorages } from "models/Product";

const StorageProductDomain = createDomain();

export const addAllocation = StorageProductDomain.event<StorageProduct>();
export const deleteAllocation = StorageProductDomain.event<StorageProduct>();
export const changeAllocationForStorage = StorageProductDomain.event<
  StorageWithProducts
>();
export const changeAllocationForProduct = StorageProductDomain.event<
  ProductByStorages
>();

// addStorage.use(StorageSerivce.addStorage);
// deleteStorage.use(StorageSerivce.deleteStorage);

const initialState: StorageProduct[] = [];

export interface StorageState {
  storages: Storage[];
}

export const StoragesProductsStore = StorageProductDomain.store<
  StorageProduct[]
>(initialState)
  .on(addAllocation, (state, payload) => [...state, payload])
  .on(deleteAllocation, (state, payload) =>
    state.filter(
      storage =>
        storage.productId !== payload.productId &&
        storage.storageId !== payload.storageId
    )
  )
  .on(changeAllocationForStorage, (state, payload) => {
    const { id: storageId, products } = payload;
    const storagesWithoutCurrent = state.filter(
      storage => storage.storageId !== storageId
    );
    const newAllocation = products.map(product => ({
      storageId,
      ...product
    }));

    return [...storagesWithoutCurrent, ...newAllocation];
  })
  .on(changeAllocationForProduct, (state, payload) => {
    const { id: productId, storages } = payload;

    const productsWithoutCurrent = state.filter(
      product => product.productId !== productId
    );
    const newAllocation = storages.map(storage => ({
      productId,
      ...storage
    }));

    return [...productsWithoutCurrent, ...newAllocation];
  });
