import * as React from "react";
import styled from "styled-components";
import { FieldArray } from "formik";
import { useStore } from "effector-react";
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

import StorageProduct, { ProductIdWithQuantity } from "models/StorageProduct";
import Product from "models/Product";
import Storage from "models/Storage";
import { ProductsStore } from "store/products";

interface Props {
  allocation: any[];
  products: Product[];
  storages: Storage[];
  onChange: (event: React.ChangeEvent<any>) => void;
  disabled?: {
    product?: boolean;
    storage?: boolean;
    quantity?: boolean;
  };
}

const StorageRedistributionFields: React.FC<Props> = ({
  allocation,
  storages,
  products,
  disabled,
  onChange
}): JSX.Element => {
  return (
    <FieldArray
      name="allocation"
      render={arrayHelpers => (
        <>
          {allocation &&
            allocation.length > 0 &&
            allocation.map((allocation: StorageProduct, index: number) => (
              <Grid container alignItems="center" spacing={1}>
                <Grid item xs={4}>
                  <FormControlSelect>
                    <InputLabel htmlFor="storage-select">Storage</InputLabel>
                    <Select
                      value={allocation.storageId}
                      inputProps={{
                        name: `allocation.${index}.storageId`,
                        id: "storage-select"
                      }}
                      onChange={onChange}
                      disabled={disabled && disabled.storage}
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
                  <FormControlSelect>
                    <InputLabel htmlFor="product-select">Product</InputLabel>
                    <Select
                      value={allocation.productId}
                      inputProps={{
                        name: `allocation.${index}.productId`,
                        id: "product-select"
                      }}
                      onChange={onChange}
                      disabled={disabled && disabled.product}
                      autoWidth
                    >
                      {products.map(({ id, name }) => (
                        <MenuItem key={id} value={id}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControlSelect>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    name={`allocation.${index}.quantity`}
                    label="Quantity"
                    margin="normal"
                    type="number"
                    onChange={onChange}
                    value={allocation.quantity}
                    disabled={disabled && disabled.quantity}
                    fullWidth
                  />
                </Grid>
              </Grid>
            ))}
        </>
      )}
    />
  );
};

export default StorageRedistributionFields;

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
