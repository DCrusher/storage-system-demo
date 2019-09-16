import Storage, { StorageWithProducts } from "models/Storage";
import uuid from "uuid";

class StorageService {
  createStorage(storage: StorageWithProducts) {
    return new Promise<StorageWithProducts>(resolve =>
      setTimeout(() => {
        const newStorage = { ...storage, id: uuid() };
        resolve(newStorage);
      }, 500)
    );
  }

  updateStorage(storage: StorageWithProducts) {
    return new Promise<StorageWithProducts>(resolve =>
      setTimeout(() => {
        const updatedStorage = { ...storage };
        resolve(updatedStorage);
      }, 500)
    );
  }

  deleteStorage(storage: Storage) {
    return new Promise<Storage>(resolve =>
      setTimeout(() => resolve(storage), 100)
    );
  }
}

export default new StorageService();
