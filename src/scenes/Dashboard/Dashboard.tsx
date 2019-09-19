import * as React from "react";
import styled from "styled-components";
import useReactRouter from "use-react-router";
import StoreIcon from "@material-ui/icons/Store";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import FeatureWidget from "./components/FeatureWidget";
import routes from "routes";
import { useStore } from "effector-react";
import { StoragesStore } from "store/storages";
import { ProductsStore } from "store/products";

const Dashboard: React.FC = (): JSX.Element => {
  const { history } = useReactRouter();
  const productsRoute = routes.app.products;
  const storagesRoute = routes.app.storages;
  const storages = useStore(StoragesStore);
  const products = useStore(ProductsStore);

  return (
    <Wrapper>
      <FeatureWidget
        onClick={() => history.push(productsRoute.path, productsRoute.caption)}
        counter={storages.length}
      >
        Products
        <ProductsIcon />
      </FeatureWidget>
      <FeatureWidget
        onClick={() => history.push(storagesRoute.path, storagesRoute.caption)}
        counter={products.length}
      >
        Storages
        <StoragesIcon />
      </FeatureWidget>
    </Wrapper>
  );
};

export default Dashboard;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  > :first-child {
    margin-right: 20px;
  }
`;

const StoragesIcon = styled(StoreIcon)`
  margin: 0 20px;
  font-size: 60px;
`;

const ProductsIcon = styled(ShoppingCartIcon)`
  margin: 0 20px;
  font-size: 60px;
`;
