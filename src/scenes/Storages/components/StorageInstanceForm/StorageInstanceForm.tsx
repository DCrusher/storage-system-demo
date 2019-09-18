import * as React from "react";
import styled from "styled-components";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, Paper, TextField } from "@material-ui/core";
import StorageProducts from "../StorageProducts";

interface Props {
  initialValues: any;
  onSubmit: (values: any) => void;
  submitCaption: string;
}

const StorageInstanceForm: React.FC<Props> = ({
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
              <StorageProducts
                productsWithQuantity={values.products}
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

export default StorageInstanceForm;

// export default withFormik({
//   // mapPropsToValues: () => ({ name: "" }),
//   validationSchema: Yup.object().shape({
//     name: Yup.string().required("Please input name")
//   }),
//   handleSubmit: (values, { setSubmitting }) => {
//     setSubmitting(false);
//   }
// })(StorageInstanceForm);

const WrapperForm = styled.form`
  width: 500px;
  margin: auto;
`;

const FormContent = styled.div`
  padding: 0 20px;
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
