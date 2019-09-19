import * as React from "react";
import styled from "styled-components";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar
} from "@material-ui/core";
import Product from "models/Product";
import { useStore } from "effector-react";
import StoreIcon from "@material-ui/icons/Store";

import { StoragesProductsStore } from "store/storagesProducts";
import { isEmpty } from "utils";
import { StoragesStore } from "store/storages";

interface Props {
  product: Product;
}

const ProductDetails: React.FC<Props> = ({ product }): JSX.Element | null => {
  const storagesProducts = useStore(StoragesProductsStore);
  const storages = useStore(StoragesStore);
  const productAllocation = storagesProducts.filter(
    allocation => allocation.productId === product.id
  );

  return (
    <Wrapper>
      <CommonInfo>Total quantity: {product.totalQuantity}</CommonInfo>
      {!isEmpty(productAllocation) ? (
        <List>
          {productAllocation.map(({ productId, storageId, quantity }) => {
            const storage = storages.find(({ id }) => id === storageId) || {
              name: ""
            };

            return (
              <ListItem key={storageId + productId} button>
                <ListItemAvatar>
                  <StoreIcon />
                </ListItemAvatar>
                <ListItemText>
                  {storage.name}: {quantity}
                </ListItemText>
              </ListItem>
            );
          })}
        </List>
      ) : (
        <Placeholder>Product isn't allocated</Placeholder>
      )}
    </Wrapper>
  );
};

export default ProductDetails;

const Wrapper = styled.div`
  width: 250px;
`;

const CommonInfo = styled.div`
  margin: 5px 20px;
`;

const Placeholder = styled.div`
  margin: 20px;
  color: lightgray;
`;
