import * as React from "react";
import styled from "styled-components";
import { Formik } from "formik";
import { useStore } from "effector-react";
import * as Yup from "yup";
import { Button, Paper, TextField, FormControl } from "@material-ui/core";

import { StoragesStore } from "store/storages";
import ProductStoragesFields from "../ProductStoragesFields";
import FormErrors from "components/FormErrors";

interface Props {
  initialValues: any;
  onSubmit: (values: any) => void;
  submitCaption: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("name is required")
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

const ProductsCaption = styled.div`
  color: gray;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const FormControlSelect = styled(FormControl)`
  width: 100%;
  margin-top: 16px;
  margin-bottom: 8px;
`;
