import * as React from "react";
import styled from "styled-components";
import { Drawer as MuiDrawer, Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

interface Props {
  children: React.ReactNode;
  open: boolean;
  caption?: string;
  onClose?: () => void;
}

const Drawer: React.FC<Props> = ({
  open,
  caption,
  children,
  onClose
}): JSX.Element => {
  return (
    <MuiDrawer open={open} anchor="right" variant="persistent">
      <Inner>
        <Header>
          <Typography component="h3">{caption}</Typography>
          <CloseButton aria-label="close" onClick={onClose}>
            <CloseIcon />
          </CloseButton>
        </Header>
        <div>{children}</div>
      </Inner>
    </MuiDrawer>
  );
};

export default Drawer;

const Inner = styled.div`
  margin-top: 64px;
`;

const Header = styled.head`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px;
`;

const CloseButton = styled(IconButton)`
  margin-left: 10px 5px;
`;
