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

import { ProductIdWithQuantity } from "models/StorageProduct";
import Product from "models/Product";

interface Props {
  productsWithQuantity: ProductIdWithQuantity[];
  products: Product[];
  onChange: (event: React.ChangeEvent<any>) => void;
}

const StorageProductsFields: React.FC<Props> = ({
  productsWithQuantity,
  products,
  onChange
}): JSX.Element => {
  return (
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

          {productsWithQuantity &&
            productsWithQuantity.length > 0 &&
            productsWithQuantity.map(
              (product: ProductIdWithQuantity, index: number) => (
                <Grid container alignItems="center" spacing={1}>
                  <Grid item xs={6}>
                    <FormControlSelect>
                      <InputLabel htmlFor="product-select">Product</InputLabel>
                      <Select
                        value={product.productId}
                        inputProps={{
                          name: `products.${index}.productId`,
                          id: "product-select"
                        }}
                        onChange={onChange}
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
                      name={`products.${index}.quantity`}
                      label="Quantity"
                      margin="normal"
                      type="number"
                      onChange={onChange}
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
  );
};

export default StorageProductsFields;

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
