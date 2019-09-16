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
import { StoragesStore } from "store/storages";
import { StoragesProductsStore } from "store/storagesProducts";

interface Props {
  onEdit: (storage: any) => void;
  onDelete: (storage: Storage) => void;
}

const StoragesList: React.FC<Props> = ({ onEdit, onDelete }): JSX.Element => {
  const storages = useStore(StoragesStore);
  const storagesProducts = useStore(StoragesProductsStore);

  return (
    <List>
      {storages.map((storage, index) => {
        let productsCount = 0;
        let productsTotalQuantity = 0;
        const products: any[] = [];

        storagesProducts.forEach(({ storageId, productId, quantity }) => {
          if (storageId === storage.id) {
            products.push({ productId, quantity });
            productsCount++;
            productsTotalQuantity += quantity;
          }
        });

        return (
          <React.Fragment key={storage.id}>
            <ListItem button>
              <ListItemAvatar>
                <ShoppingCartIcon />
              </ListItemAvatar>
              <ListItemText
                primary={storage.name}
                secondary={`Product positions: ${productsCount}, Total quantity: ${productsTotalQuantity}`}
              />
              <ListItemSecondaryAction>
                <IconButton
                  onClick={() => {
                    onDelete(storage);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    onEdit({ ...storage, products });
                  }}
                >
                  <EditIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            {index < storages.length - 1 && <Divider />}
          </React.Fragment>
        );
      })}
    </List>
  );
};

export default StoragesList;
