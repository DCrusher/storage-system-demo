import StoreIcon from "@material-ui/icons/Store";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import { Storages, Products } from "./scenes";

export default {
  app: {
    storages: {
      path: "/storages",
      caption: "Storages",
      Icon: StoreIcon,
      Scene: Storages
    },
    products: {
      path: "/products",
      caption: "Products",
      Icon: ShoppingCartIcon,
      Scene: Products
    }
  }
};
