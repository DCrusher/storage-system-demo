import * as React from "react";
import styled from "styled-components";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar
} from "@material-ui/core";
import { useStore } from "effector-react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import Storage from "models/Storage";
import { StoragesProductsStore } from "store/storagesProducts";
import { isEmpty } from "utils";
import { ProductsStore } from "store/products";

interface Props {
  storage: Storage;
}

const StorageDetails: React.FC<Props> = ({ storage }): JSX.Element | null => {
  const storagesProducts = useStore(StoragesProductsStore);
  const products = useStore(ProductsStore);
  const storageAllocation = storagesProducts.filter(
    allocation => allocation.storageId === storage.id
  );

  return (
    <Wrapper>
      {!isEmpty(storageAllocation) ? (
        <List>
          {storageAllocation.map(({ productId, storageId, quantity }) => {
            const product = products.find(({ id }) => id === productId) || {
              name: ""
            };

            return (
              <ListItem key={productId + storageId} button>
                <ListItemAvatar>
                  <ShoppingCartIcon />
                </ListItemAvatar>
                <ListItemText>
                  {product.name}: {quantity}
                </ListItemText>
              </ListItem>
            );
          })}
        </List>
      ) : (
        <Placeholder>Storage is empty</Placeholder>
      )}
    </Wrapper>
  );
};

export default StorageDetails;

const Wrapper = styled.div`
  width: 250px;
`;

const Placeholder = styled.div`
  margin: 20px;
  color: lightgray;
`;
