import * as React from "react";
import styled from "styled-components";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { Divider } from "@material-ui/core";

import Dialog from "components/Dialog";
import instanceOperations from "constants/instanceOperations";
import Product, { ProductByStorages } from "models/Product";

import ProductInstanceForm from "./components/ProductInstanceForm";
import ProductsList from "./components/ProductsList";
import { deleteProduct, createProduct, updateProduct } from "store/products";

const emptyProduct = {
  id: "",
  name: "",
  storages: [
    {
      storageId: "",
      quantity: 0
    }
  ]
};

const DIALOG_TITLES = {
  create: "Creating product",
  edit: "Editing product"
};

const SUBMIT_CAPTIONS = {
  create: "Create",
  edit: "Update"
};

const Products: React.FC = () => {
  const [instanceOperation, setInstanceOperation] = React.useState<
    string | null
  >(instanceOperations.void);
  const [currentProduct, setCurrentProduct] = React.useState<ProductByStorages>(
    emptyProduct
  );

  const handleOpenAddDialog = () => {
    setInstanceOperation(instanceOperations.create);
    setCurrentProduct(emptyProduct);
  };

  const handleCloseDialog = () => {
    setInstanceOperation(instanceOperations.void);
  };

  const handleDelete = (products: Product) => {
    deleteProduct(products);
  };

  const handleOpenEdit = (productByStorages: any) => {
    setInstanceOperation(instanceOperations.edit);
    setCurrentProduct(productByStorages);
  };

  const handleSubmitCreate = (productByStorages: ProductByStorages) => {
    createProduct(productByStorages);
    setInstanceOperation(instanceOperations.void);
  };

  const handleSubmitUpdate = (productByStorages: ProductByStorages) => {
    updateProduct(productByStorages);
    setInstanceOperation(instanceOperations.void);
  };

  const isEdit = instanceOperation === instanceOperations.edit;

  return (
    <Wrapper>
      <Fab
        variant="extended"
        size="medium"
        color="primary"
        aria-label="Add"
        onClick={handleOpenAddDialog}
      >
        <AddIcon />
        Add product
      </Fab>
      <ToolbarDivider />
      <ProductsList onDelete={handleDelete} onEdit={handleOpenEdit} />
      <Dialog
        open={Boolean(instanceOperation)}
        onClose={handleCloseDialog}
        title={isEdit ? DIALOG_TITLES.edit : DIALOG_TITLES.create}
      >
        <ProductInstanceForm
          initialValues={currentProduct}
          onSubmit={isEdit ? handleSubmitUpdate : handleSubmitCreate}
          submitCaption={isEdit ? SUBMIT_CAPTIONS.edit : SUBMIT_CAPTIONS.create}
        />
      </Dialog>
    </Wrapper>
  );
};

export default Products;

const Wrapper = styled.div`
  width: 100%;
`;

const ToolbarDivider = styled(Divider)`
  margin: 20px 0;
`;
