import * as React from "react";
import styled from "styled-components";
import { FieldArray } from "formik";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  Grid,
  Fab,
  TextField,
  IconButton,
  Select,
  FormControl,
  InputLabel,
  MenuItem
} from "@material-ui/core";

import { StorageIdWithQuantity } from "models/StorageProduct";
import Storage from "models/Storage";

interface Props {
  storagesWithQuantity: StorageIdWithQuantity[];
  storages: Storage[];
  onChange: (event: React.ChangeEvent<any>) => void;
}

const ProductStoragesFields: React.FC<Props> = ({
  storagesWithQuantity,
  storages,
  onChange
}): JSX.Element => {
  return (
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

          {storagesWithQuantity &&
            storagesWithQuantity.length > 0 &&
            storagesWithQuantity.map(
              (storage: StorageIdWithQuantity, index: number) => (
                <Grid container alignItems="center" spacing={1}>
                  <Grid item xs={6}>
                    <FormControlSelect>
                      <InputLabel htmlFor="storage-select">Storage</InputLabel>
                      <Select
                        value={storage.storageId}
                        inputProps={{
                          name: `storages.${index}.storageId`,
                          id: "storage-select"
                        }}
                        onChange={onChange}
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
                      onChange={onChange}
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
  );
};

export default ProductStoragesFields;

const ProductsCaption = styled.div`
  color: gray;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FormControlSelect = styled(FormControl)`
  width: 100%;
  margin-top: 16px;
  margin-bottom: 8px;
`;
