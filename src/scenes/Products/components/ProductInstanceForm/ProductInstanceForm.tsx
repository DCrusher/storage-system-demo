import * as React from "react";
import styled from "styled-components";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, Paper, TextField, FormControl } from "@material-ui/core";

import ProductStorages from "../ProductStorages";

interface Props {
  initialValues: any;
  onSubmit: (values: any) => void;
  submitCaption: string;
}

const ProductInstanceForm: React.FC<Props> = ({
  initialValues,
  submitCaption,
  onSubmit
}): JSX.Element => {
  return (
    <Formik
      initialValues={initialValues}
      validate={values => {}}
      onSubmit={onSubmit}
    >
      {({ values, handleSubmit, handleChange }) => (
        <WrapperForm onSubmit={handleSubmit}>
          <FormContent>
            <TextField
              id="name"
              label="Name"
              margin="normal"
              type="text"
              onChange={handleChange}
              value={values.name}
              fullWidth
            />

            <ProductsWrapper>
              <ProductStorages
                storagesWithQuantity={values.storages}
                onChange={handleChange}
              />
            </ProductsWrapper>
          </FormContent>

          <SubmitButton
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            {submitCaption}
          </SubmitButton>
        </WrapperForm>
      )}
    </Formik>
  );
};

export default ProductInstanceForm;

const WrapperForm = styled.form`
  width: 500px;
  margin: auto;
`;

const FormContent = styled.div`
  padding: 0 20px;
`;

const ProductsCaption = styled.div`
  color: gray;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProductsWrapper = styled(Paper)`
  margin: 20px 0;
  padding: 20px;
`;

const SubmitButton = styled(Button)`
  margin-top: 40px;
  width: 100%;
  border-radius: 0;
`;

const FormControlSelect = styled(FormControl)`
  width: 100%;
  margin-top: 16px;
  margin-bottom: 8px;
`;
