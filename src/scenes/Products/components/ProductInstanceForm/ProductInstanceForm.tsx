import * as React from "react";
import styled from "styled-components";
import { Formik } from "formik";
import { useStore } from "effector-react";
import * as Yup from "yup";
import { Button, Paper, TextField, Grid } from "@material-ui/core";

import { StorageIdWithQuantity } from "models/StorageProduct";
import { StoragesStore } from "store/storages";
import ProductStoragesFields from "../ProductStoragesFields";
import FormErrors from "components/FormErrors";
import { isEmpty } from "utils";

interface Props {
  initialValues: any;
  onSubmit: (values: any) => void;
  submitCaption: string;
}

const validationSchema = Yup.lazy((values: any) => {
  const { storages, totalQuantity } = values;

  const storagesTotalQuantity = !isEmpty(storages)
    ? storages.reduce(
        (acc: number, storage: StorageIdWithQuantity) =>
          (acc += storage.quantity),
        0
      )
    : 0;

  return Yup.object().shape({
    name: Yup.string().required("Please input name"),
    totalQuantity: Yup.number()
      .required("Total quantity is required")
      .min(0),
    ...(storagesTotalQuantity > totalQuantity && {
      allocation: Yup.string().required("Exceeded total quantity")
    })
  });
});

const ProductInstanceForm: React.FC<Props> = ({
  initialValues,
  submitCaption,
  onSubmit
}): JSX.Element => {
  const storages = useStore(StoragesStore);

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
            <Grid container spacing={2}>
              <Grid item xs={7}>
                <TextField
                  id="name"
                  label="Name"
                  margin="normal"
                  type="text"
                  onChange={handleChange}
                  value={values.name}
                  fullWidth
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  id="totalQuantity"
                  label="Total Quantity"
                  margin="normal"
                  type="number"
                  onChange={handleChange}
                  value={values.totalQuantity}
                  fullWidth
                />
              </Grid>
            </Grid>

            <ProductsWrapper>
              <ProductStoragesFields
                storagesWithQuantity={values.storages}
                storages={storages}
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

const FormMessages = styled.div`
  margin: 0 20px;
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
