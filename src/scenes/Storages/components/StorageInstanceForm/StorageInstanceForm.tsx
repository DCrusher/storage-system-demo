import * as React from "react";
import styled from "styled-components";
import { withFormik, InjectedFormikProps, FieldArray } from "formik";
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

import Product from "models/Product";

// interface Props {
//   open: boolean;
//   onClose: () => void;
// }

interface FormValues {
  name?: string;
  products?: Product[];
}

interface FormProps {
  handleSubmit: () => void;
  values: FormValues;
}

const StorageInstanceForm: React.FC<
  InjectedFormikProps<FormProps, FormValues>
> = (props): JSX.Element => {
  const { values, handleSubmit, handleChange } = props;

  return (
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
                  values.products.map((product, index) => (
                    <Grid container alignItems="center" spacing={1}>
                      <Grid item xs={6}>
                        <TextField
                          name={`products.${index}.productId`}
                          label="Product"
                          margin="normal"
                          type="text"
                          onChange={props.handleChange}
                          value={product.id}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          name={`products.${index}.quantity`}
                          label="Quantity"
                          margin="normal"
                          type="number"
                          onChange={props.handleChange}
                          value={product.id}
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
                  ))}
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
        Create
      </SubmitButton>
    </WrapperForm>
  );
};

export default withFormik({
  // mapPropsToValues: () => ({ name: "" }),
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Please input name")
  }),
  handleSubmit: (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  }
})(StorageInstanceForm);

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
