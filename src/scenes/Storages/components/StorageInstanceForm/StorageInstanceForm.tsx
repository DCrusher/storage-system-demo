import * as React from "react";
import styled from "styled-components";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, Paper, TextField } from "@material-ui/core";
import { useStore } from "effector-react";

import { ProductsStore } from "store/products";
import FormErrors from "components/FormErrors";
import StorageProductsFields from "../StorageProductsFields";

interface Props {
  initialValues: any;
  onSubmit: (values: any) => void;
  submitCaption: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Please input name")
});

const StorageInstanceForm: React.FC<Props> = ({
  initialValues,
  submitCaption,
  onSubmit
}): JSX.Element => {
  const products = useStore(ProductsStore);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnChange={false}
      onSubmit={onSubmit}
    >
      {({ values, handleSubmit, handleChange, errors }) => (
        <WrapperForm onSubmit={handleSubmit}>
          <FormMessages>
            {errors && <FormErrors errors={errors} />}
          </FormMessages>

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
              <StorageProductsFields
                productsWithQuantity={values.products}
                products={products}
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

const FormMessages = styled.div`
  margin: 0 20px;
`;

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
