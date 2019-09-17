import { createDomain } from "effector";
import uuid from "uuid";

import Storage, { StorageWithProducts } from "models/Storage";
import StorageSerivce from "services/StorageSerivce";
import {
  addAllocation,
  changeAllocationForStorage
} from "store/storagesProducts";

const StorageDomain = createDomain();

export const createStorage = StorageDomain.effect<
  StorageWithProducts,
  StorageWithProducts,
  Error
>();
export const updateStorage = StorageDomain.effect<
  StorageWithProducts,
  StorageWithProducts,
  Error
>();
export const deleteStorage = StorageDomain.effect<Storage, Storage, Error>();

createStorage.use(StorageSerivce.createStorage);
updateStorage.use(StorageSerivce.updateStorage);
deleteStorage.use(StorageSerivce.deleteStorage);

const initialState: Storage[] = [
  {
    id: uuid(),
    name: "storage 1"
  }
];

export interface StorageState {
  storages: Storage[];
}

export const StoragesStore = StorageDomain.store<Storage[]>(initialState)
  .on(createStorage.done, (state, { result }) => {
    const { products, ...storage } = result;

    products &&
      products.forEach(({ productId, quantity }: any) => {
        addAllocation({
          storageId: storage.id,
          productId,
          quantity
        });
      });

    return [...state, storage];
  })
  .on(updateStorage.done, (state, { result }) => {
    const { products, ...storage } = result;

    changeAllocationForStorage(result);

    const storagesWithoutUpdated = state.filter(
      storage => storage.id !== result.id
    );
    return [...storagesWithoutUpdated, storage];
  })
  .on(deleteStorage.done, (state, { result }) =>
    state.filter(storage => storage.id !== result.id)
  );
