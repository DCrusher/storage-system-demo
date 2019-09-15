import React from "react";
import { Route } from "react-router-dom";
import useReactRouter from "use-react-router";
import styled from "styled-components";
import { Button } from "@material-ui/core";

import RouteModel from "models/Route";
import routes from "routes";
import AppLayout from "layouts/AppLayout";

const appRoutes: RouteModel[] = Object.values(routes.app);

const App: React.FC = () => {
  const { history, location } = useReactRouter();
  const [currentCaption, setCurrentCaption] = React.useState(location.state);

  const handleChangePath = (path: string, caption: string) => {
    history.push(path, caption);
    setCurrentCaption(caption);
  };

  return (
    <AppLayout onChangePath={handleChangePath} currentCaption={currentCaption}>
      <MyButton variant="outlined">material ui button</MyButton>

      {appRoutes.map(({ path, Scene }) => (
        <Route key={Scene} path={path} component={Scene} />
      ))}
    </AppLayout>
  );
};

export default App;

const MyButton = styled(Button)`
  background-color: green;
`;
