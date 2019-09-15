import * as React from "react";
import styled from "styled-components";
import useReactRouter from "use-react-router";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import AuthLayout from "layouts/AuthLayout";
import AuthService from "services/AuthService";
import routes from "routes";

const Auth: React.FC = () => {
  const { history } = useReactRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const elements: any = event.currentTarget.elements;

    AuthService.signin(elements["email"].value, elements["password"].value);
    history.push(routes.root.path);
  };

  return (
    <AuthLayout>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type="email"
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <SubmitButton
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
        >
          Sign In
        </SubmitButton>
      </Form>
    </AuthLayout>
  );
};

export default Auth;

const Form = styled.form`
  width: 100%;
  margin-top: 10px;
`;

const SubmitButton = styled(Button)`
  margin: 10px 0;
`;
