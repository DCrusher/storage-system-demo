import * as React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthService from "services/AuthService";

interface Props {
  component: any;
  path: string;
  redirectTo: string;
}

const PrivateRoute: React.FC<Props> = ({
  component: Component,
  redirectTo,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      AuthService.isAuthorized() ? (
        <Component {...props} />
      ) : (
        <Redirect to={redirectTo} />
      )
    }
  />
);

export default PrivateRoute;
