import * as React from "react";
import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Container from "@material-ui/core/Container";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const AuthLayout: React.FC<Props> = ({ children }): JSX.Element => {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Content>
        <AvatarWrapper>
          <LockOutlinedIcon />
        </AvatarWrapper>
        {children}
      </Content>
    </Container>
  );
};

export default AuthLayout;

const Content = styled.div`
  margintop: 100ox;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AvatarWrapper = styled(Avatar)`
  margin: 10px;
  background-color: red;
`;
