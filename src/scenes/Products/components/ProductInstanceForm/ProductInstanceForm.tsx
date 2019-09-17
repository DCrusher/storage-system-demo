import * as React from "react";
import styled from "styled-components";
import { useStore } from "effector-react";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import {
  Button,
  Paper,
  Grid,
  Fab,
  TextField,
  IconButton,
  Select,
  FormControl,
  InputLabel,
  MenuItem
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

import Storage from "models/Storage";
import { StorageIdWithQuantity } from "models/StorageProduct";

import { StoragesStore } from "store/storages";

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
  const storages = useStore(StoragesStore);

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
                name="storages"
                render={arrayHelpers => (
                  <>
                    <ProductsCaption>
                      <span>Storages</span>
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

                    {values.storages &&
                      values.storages.length > 0 &&
                      values.storages.map(
                        (storage: StorageIdWithQuantity, index: number) => (
                          <Grid container alignItems="center" spacing={1}>
                            <Grid item xs={6}>
                              <FormControlSelect>
                                <InputLabel htmlFor="storage-select">
                                  Storage
                                </InputLabel>
                                <Select
                                  value={storage.storageId}
                                  inputProps={{
                                    name: `storages.${index}.storageId`,
                                    id: "storage-select"
                                  }}
                                  onChange={handleChange}
                                  autoWidth
                                >
                                  {storages.map(({ id, name }) => (
                                    <MenuItem key={id} value={id}>
                                      {name}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControlSelect>
                            </Grid>
                            <Grid item xs={4}>
                              <TextField
                                name={`storages.${index}.quantity`}
                                label="Quantity"
                                margin="normal"
                                type="number"
                                onChange={handleChange}
                                value={storage.quantity}
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
