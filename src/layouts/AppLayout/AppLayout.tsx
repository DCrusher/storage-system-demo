import * as React from "react";
import styled, { css } from "styled-components";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";

import SideMenu from "./SideMenu";

const drawerWidth = 240;

interface Props {
  children: React.ReactNode;
  onChangePath: (path: string) => void;
}

const AppLayout: React.FC<Props> = ({
  children,
  onChangePath
}): JSX.Element => {
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Wrapper>
      <CssBaseline />
      <TopBar position="absolute" open={open}>
        <TopToolbar>
          {!open && (
            <MenuButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </MenuButton>
          )}
          <Title component="h1" variant="h6" color="inherit" noWrap>
            Dashboard
          </Title>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </TopToolbar>
      </TopBar>
      <LeftSideBar variant="permanent" open={open}>
        <ToolbarIcon>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </ToolbarIcon>
        <Divider />
        <SideMenu onChange={onChangePath} />
      </LeftSideBar>
      <Content>
        <ContentWrapper maxWidth="lg">
          <Grid container>{children}</Grid>
        </ContentWrapper>
      </Content>
    </Wrapper>
  );
};

export default AppLayout;

const Wrapper = styled.div`
  display: flex;
`;

interface TopBarProps {
  open: boolean;
}

const TopBar = styled(AppBar)<TopBarProps>`
  width: ${p => (p.open ? `calc(100% - ${drawerWidth}px)` : "100%")};
  margin-left: ${drawerWidth}px;
  z-index: 1201;
  transition: width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms,
    margin 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
`;

const TopToolbar = styled(Toolbar)`
  padding-right: 24px;
`;

const MenuButton = styled(IconButton)`
  margin-right: 36px;
`;

const LeftSideBar = styled(Drawer)`
  .MuiDrawer-paper {
    position: relative;

    ${p =>
      p.open
        ? css`
            white-space: nowrap;
            width: 240px;
            transition: width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
          `
        : css`
            overflow-x: hidden;
            width: 72px;
            transition: width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
          `}
  }
`;

const Title = styled(Typography)`
  flex-grow: 1;
`;

const ToolbarIcon = styled.div`
  display: flex;
  padding: 0 8px;
  align-items: center;
  justify-content: flex-end;
  min-height: 64px;
`;

const Content = styled.main`
  flex-grow: 1;
  height: 100vh;
  overflow: auto;
`;

const ContentWrapper = styled(Container)`
  margin-top: 64px;
  padding-top: 32px;
  padding-bottom: 32px;
`;
