import { createDomain } from "effector";
import uuid from "uuid";

import StorageProduct from "models/StorageProduct";

const StorageProductDomain = createDomain();

export const addAllocation = StorageProductDomain.event<StorageProduct>();
export const deleteAllocation = StorageProductDomain.event<StorageProduct>();

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
  );
