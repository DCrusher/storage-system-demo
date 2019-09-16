import * as React from "react";
import styled from "styled-components";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import {
  Button,
  Paper,
  Grid,
  Fab,
  TextField,
  IconButton
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

import StorageWithProducts from "models/Storage";
import ProductIdWithQuantity from "models/StorageProduct";
import Product from "models/Product";

// interface Props {
//   open: boolean;
//   onClose: () => void;
// }

// interface FormValues {
//   name?: string;
//   products?: Product[];
// }

// interface FormProps {
//   handleSubmit: () => void;
//   values: FormValues;
// }

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
              <FieldArray
                name="products"
                render={arrayHelpers => (
                  <>
                    <ProductsCaption>
                      <span>Products</span>
                      <Fab
                        variant="extended"
                        size="medium"
                        aria-label="Add"
                        onClick={() => arrayHelpers.push("")}
                      >
                        <AddIcon />
                        Add
                      </Fab>
                    </ProductsCaption>

                    {values.products &&
                      values.products.length > 0 &&
                      values.products.map(
                        (product: ProductIdWithQuantity, index: number) => (
                          <Grid container alignItems="center" spacing={1}>
                            <Grid item xs={6}>
                              <TextField
                                name={`products.${index}.productId`}
                                label="Product"
                                margin="normal"
                                type="text"
                                onChange={handleChange}
                                value={product.productId}
                                fullWidth
                              />
                            </Grid>
                            <Grid item xs={4}>
                              <TextField
                                name={`products.${index}.quantity`}
                                label="Quantity"
                                margin="normal"
                                type="number"
                                onChange={handleChange}
                                value={product.quantity}
                                fullWidth
                              />
                            </Grid>
                            <Grid item xs={2}>
                              <IconButton
                                aria-label="delete"
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Grid>
                          </Grid>
                        )
                      )}
                  </>
                )}
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
