import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { StylesProvider } from "@material-ui/styles";

import routes from "routes";
import "./index.css";
import theme from "./theme/theme";
import * as serviceWorker from "./serviceWorker";
import PrivateRoute from "components/PrivateRoute";

import App from "./App";
import Auth from "./Auth";

ReactDOM.render(
  <StylesProvider injectFirst>
    <MuiThemeProvider theme={theme}>
      <Router>
        <Route path={routes.auth.signin.path} component={Auth} />
        <PrivateRoute
          path={routes.root.path}
          redirectTo={routes.auth.signin.path}
          component={App}
        />
      </Router>
    </MuiThemeProvider>
  </StylesProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
