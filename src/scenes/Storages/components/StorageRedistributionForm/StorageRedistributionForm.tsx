import * as React from "react";
import styled from "styled-components";
import { Formik, FormikProvider } from "formik";
import * as Yup from "yup";
import { Button } from "@material-ui/core";
import { useStore } from "effector-react";

import { ProductIdWithQuantity } from "models/StorageProduct";
import Storage from "models/Storage";
import { ProductsStore } from "store/products";
import { StoragesStore } from "store/storages";
import { StoragesProductsStore } from "store/storagesProducts";
import RedistributionFields from "components/RedistributionFields";
import FormErrors from "components/FormErrors";
import { isEmpty } from "utils";

const ERORRS = {
  storageRequired: "Please chose a storage for redistribution"
};

interface Props {
  submitCaption: string;
  storage: Storage;
  onSubmit: (values: any, storage: Storage) => void;
  onDelete: (storage: Storage) => void;
}

const validationSchema = Yup.object().shape({
  allocation: Yup.array().of(
    Yup.object().shape({
      storageId: Yup.string().required(
        "Please select a specific storage for the product"
      )
    })
  )
});

const StorageRedistributionForm: React.FC<Props> = ({
  submitCaption,
  storage,
  onSubmit,
  onDelete
}): JSX.Element => {
  const products = useStore(ProductsStore);
  const storages = useStore(StoragesStore);
  const allocation = useStore(StoragesProductsStore);
  const storageAllocation = allocation
    .filter(({ storageId }) => storageId === storage.id)
    .map(allocation => ({ ...allocation, storageId: "" }));
  const storagesWithoutDistributed = storages.filter(
    ({ id }) => id !== storage.id
  );

  const handleFormSubmit = (values: any) => {
    onSubmit(values.allocation, storage);
  };

  const handleDelete = (_event: React.MouseEvent<HTMLButtonElement>) => {
    onDelete(storage);
  };

  if (isEmpty(storageAllocation)) {
    return (
      <>
        <PlaceholderText>
          The storage is empty. Do you want to remove it?
        </PlaceholderText>
        <SubmitButton
          variant="contained"
          color="primary"
          size="large"
          onClick={handleDelete}
        >
          delete
        </SubmitButton>
      </>
    );
  }

  return (
    <Formik
      initialValues={{ allocation: storageAllocation }}
      validationSchema={validationSchema}
      validateOnChange={false}
      onSubmit={handleFormSubmit}
    >
      {({ values, handleSubmit, handleChange, errors }) => (
        <WrapperForm onSubmit={handleSubmit}>
          <FormMessages>
            {errors && <FormErrors errors={errors.allocation} />}
          </FormMessages>

          <FormContent>
            <RedistributionFields
              allocation={values.allocation}
              products={products}
              storages={storagesWithoutDistributed}
              disabled={{
                product: true,
                quantity: true
              }}
              onChange={handleChange}
            />
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

export default StorageRedistributionForm;

const WrapperForm = styled.form`
  width: 600px;
  margin: auto;
`;

const FormMessages = styled.div`
  margin: 0 20px;
`;

const FormContent = styled.div`
  padding: 0 20px;
`;

const SubmitButton = styled(Button)`
  margin-top: 40px;
  width: 100%;
  border-radius: 0;
`;

const PlaceholderText = styled.div`
  text-align: center;
`;
