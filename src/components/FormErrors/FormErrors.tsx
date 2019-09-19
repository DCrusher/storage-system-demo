import * as React from "react";
import styled from "styled-components";
import { Typography } from "@material-ui/core";

import { isEmpty } from "utils";

interface FormError {
  [field: string]: string;
}

interface Props {
  errors?: any;
}

function myStringify(
  data: object,
  space: string | number,
  replacer?: ((key: string, value: any) => any) | (number | string)[] | null
) {
  return JSON.stringify(data, replacer as any, space).replace(
    /({|}|\[|\]|null)/gi,
    ""
  );
}

const FormErrors: React.FC<Props> = ({ errors }): JSX.Element | null => {
  if (isEmpty(errors)) return null;

  return (
    <Wrapper>
      <Typography component="h4">Form has errors</Typography>
      <pre>{myStringify(errors, 2)}</pre>
    </Wrapper>
  );
};

export default FormErrors;

const Wrapper = styled.div`
  color: red;
`;
