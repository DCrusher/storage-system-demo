import StoreIcon from "@material-ui/icons/Store";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import { Storages, Products } from "./scenes";

export default {
  root: {
    path: "/",
    caption: "Dashboard"
  },
  app: {
    products: {
      path: "/products",
      caption: "Products",
      Icon: ShoppingCartIcon,
      Scene: Products
    },
    storages: {
      path: "/storages",
      caption: "Storages",
      Icon: StoreIcon,
      Scene: Storages
    }
  },
  auth: {
    signin: {
      path: "/signin"
    }
  }
};
