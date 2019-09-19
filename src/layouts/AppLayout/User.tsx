import * as React from "react";
import styled from "styled-components";
import useReactRouter from "use-react-router";
import AccountBox from "@material-ui/icons/AccountBox";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import AuthService from "services/AuthService";
import routes from "routes";

const User: React.FC = (): JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { history } = useReactRouter();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    setAnchorEl(null);
    AuthService.signout();
    history.push(routes.auth.signin.path);
  };

  return (
    <>
      <UserButton onClick={handleClick}>
        <UserIcon />
        {AuthService.user}
      </UserButton>
      <UserMenu
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        onClose={handleClose}
        open={Boolean(anchorEl)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
        keepMounted
      >
        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
      </UserMenu>
    </>
  );
};

export default User;

const UserIcon = styled(AccountBox)`
  font-size: 45px;
  margin: 0 10px;
`;

const UserButton = styled(Button)`
  display: flex;
  align-items: center;
  color: #fff;
`;

const UserMenu = styled(Menu)`
  .MuiMenu-list {
    display: flex;
    flex-direction: column;
    min-width: 160px;
  }
`;
