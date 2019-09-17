import Product, { ProductByStorages } from "models/Product";
import uuid from "uuid";

class ProductService {
  createProduct(product: ProductByStorages) {
    return new Promise<ProductByStorages>(resolve =>
      setTimeout(() => {
        const newStorage = { ...product, id: uuid() };
        resolve(newStorage);
      }, 500)
    );
  }

  updateProduct(product: ProductByStorages) {
    return new Promise<ProductByStorages>(resolve =>
      setTimeout(() => {
        const updatedStorage = { ...product };
        resolve(updatedStorage);
      }, 500)
    );
  }

  deleteProduct(product: Product) {
    return new Promise<Product>(resolve =>
      setTimeout(() => resolve(product), 100)
    );
  }
}

export default new ProductService();
