import React from "react";
import { Route, Link } from "react-router-dom";

import useReactRouter from "use-react-router";
import styled from "styled-components";
import { Button } from "@material-ui/core";

import logo from "./logo.svg";
import Storage from "models/Storage";

import RouteModel from "models/Route";
import routes from "routes";
import AppLayout from "layouts/AppLayout";

const appRoutes: RouteModel[] = Object.values(routes.app);

const Test = () => {
  return <span>test</span>;
};

const App: React.FC = () => {
  const { history } = useReactRouter();

  const handleChangePath = (path: string) => {
    history.push(path);
  };

  return (
    <AppLayout onChangePath={handleChangePath}>
      <MyButton variant="outlined">material ui button</MyButton>

      {appRoutes.map(({ path, Scene }) => (
        <Route key={Scene} path={path} component={Scene} />
      ))}
      {/* <Route exact path="/" component={Test} />
      <Route path="/about" component={Test} />
      <Route path="/topics" component={Test} /> */}
    </AppLayout>
  );
};

export default App;

const MyButton = styled(Button)`
  background-color: green;
`;
