import * as React from "react";
import styled, { css } from "styled-components";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Dashboard from "@material-ui/icons/Dashboard";

import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import User from "./User";

import SideMenu from "./SideMenu";
import routes from "routes";

const drawerWidth = 240;

interface Props {
  children: React.ReactNode;
  currentCaption: string;
  onChangePath: (path: string, caption: string) => void;
}

const AppLayout: React.FC<Props> = ({
  children,
  currentCaption,
  onChangePath
}): JSX.Element => {
  const [open, setOpen] = React.useState(true);
  const rootPath = routes.root;

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
            {currentCaption}
          </Title>
          <User />
        </TopToolbar>
      </TopBar>
      <LeftSideBar variant="permanent" open={open}>
        <Caption>
          <Logo
            color="primary"
            variant="h6"
            onClick={() => {
              onChangePath(rootPath.path, rootPath.caption);
            }}
          >
            <DashboardIcon />
            Megastorage
          </Logo>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </Caption>
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
            logooverflow-x: hidden;
            width: 72px;
            transition: width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
          `}
  }
`;

const Title = styled(Typography)`
  flex-grow: 1;
`;

const Logo = styled(Typography)`
  font-size: 16px;
  cursor: pointer;
  display: flex;
  text-transform: uppercase;
  font-weight: bold;
  align-items: center;
  text-shadow: 7px 5px #e4e4e4;
`;

const DashboardIcon = styled(Dashboard)`
  margin-right: 5px;
`;

const Caption = styled.div`
  display: flex;
  padding: 0 8px;
  align-items: center;
  justify-content: space-between;
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
