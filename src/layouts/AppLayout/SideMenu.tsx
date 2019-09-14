import * as React from "react";
import List from "@material-ui/core/List";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import Route from "models/Route";
import routes from "routes";

interface Props {
  onChange: (path: string) => void;
}

const appRoutes: Route[] = Object.values(routes.app);

const SideMenu: React.FC<Props> = ({ onChange }): JSX.Element => (
  <List>
    {appRoutes.map(
      ({ path, Icon, caption }): JSX.Element => (
        <ListItem key={caption} onClick={() => onChange(path)} button>
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
          <ListItemText primary={caption} />
        </ListItem>
      )
    )}
  </List>
);

export default SideMenu;
