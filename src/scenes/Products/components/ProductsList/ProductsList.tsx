import * as React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Badge,
  Tooltip,
  Divider
} from "@material-ui/core";
import { useStore } from "effector-react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import Product from "models/Product";
import { ProductsStore } from "store/products";
import { StoragesProductsStore } from "store/storagesProducts";

const MAX_SHOWN_COUNT = 1000;

interface Props {
  onEdit: (product: any) => void;
  onDelete: (product: Product) => void;
  onView: (product: Product) => void;
}

const Products: React.FC<Props> = ({
  onEdit,
  onDelete,
  onView
}): JSX.Element => {
  const products = useStore(ProductsStore);
  const storagesProducts = useStore(StoragesProductsStore);

  return (
    <List>
      {products.map((product, index) => {
        let storagesCount = 0;
        let productsTotalQuantity = 0;
        const storages: any[] = [];
        const { id, name, totalQuantity } = product;

        storagesProducts.forEach(({ storageId, productId, quantity }) => {
          if (productId === product.id) {
            storages.push({ storageId, quantity });
            storagesCount++;
            productsTotalQuantity += quantity;
          }
        });

        return (
          <React.Fragment key={id}>
            <ListItem button onClick={() => onView(product)}>
              <ListItemAvatar>
                <Tooltip title={`Total quantity of product: ${totalQuantity}`}>
                  <Badge
                    badgeContent={totalQuantity}
                    color="primary"
                    max={MAX_SHOWN_COUNT}
                    anchorOrigin={{
                      horizontal: "left",
                      vertical: "bottom"
                    }}
                  >
                    <ShoppingCartIcon />
                  </Badge>
                </Tooltip>
              </ListItemAvatar>

              <ListItemText
                primary={name}
                secondary={`Storages: ${storagesCount}, Quantity in strages: ${productsTotalQuantity}`}
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
