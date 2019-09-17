import * as React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider
} from "@material-ui/core";
import { useStore } from "effector-react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import Storage from "models/Storage";
import { ProductIdWithQuantity } from "models/StorageProduct";
import { ProductsStore } from "store/products";
import { StoragesProductsStore } from "store/storagesProducts";

interface Props {
  onEdit: (storage: any) => void;
  onDelete: (storage: Storage) => void;
}

const Products: React.FC<Props> = ({ onEdit, onDelete }): JSX.Element => {
  const products = useStore(ProductsStore);
  const storagesProducts = useStore(StoragesProductsStore);

  return (
    <List>
      {products.map((product, index) => {
        let storagesCount = 0;
        let productsTotalQuantity = 0;
        const storages: any[] = [];

        storagesProducts.forEach(({ storageId, productId, quantity }) => {
          if (productId === product.id) {
            storages.push({ storageId, quantity });
            storagesCount++;
            productsTotalQuantity += quantity;
          }
        });

        return (
          <React.Fragment key={product.id}>
            <ListItem button>
              <ListItemAvatar>
                <ShoppingCartIcon />
              </ListItemAvatar>
              <ListItemText
                primary={product.name}
                secondary={`Storages: ${storagesCount}, Total quantity: ${productsTotalQuantity}`}
              />
              <ListItemSecondaryAction>
                <IconButton
                  onClick={() => {
                    onDelete(product);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    onEdit({ ...product, storages });
                  }}
                >
                  <EditIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            {index < products.length - 1 && <Divider />}
          </React.Fragment>
        );
      })}
    </List>
  );
};

export default Products;
