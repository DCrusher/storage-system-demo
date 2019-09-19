import { createDomain } from "effector";

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
export const deleteAllocationForProduct = StorageProductDomain.event<{
  id: string;
}>();
export const redistributeStorage = StorageProductDomain.event<any>();

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
  })
  .on(deleteAllocationForProduct, (state, payload) => {
    const { id: productId } = payload;
    const productsWithoutCurrent = state.filter(
      product => product.productId !== productId
    );

    return [...productsWithoutCurrent];
  })
  .on(redistributeStorage, (state, payload) => {
    const {
      storage: { id: storageId },
      allocation
    } = payload;

    const storagesWithoutCurrent = state.filter(
      storage => storage.storageId !== storageId
    );
    const allocationWithoutVoidStorage = allocation.filter(
      (storage: StorageProduct) => storage.storageId !== "void"
    );

    return [...storagesWithoutCurrent, ...allocationWithoutVoidStorage];
  });
