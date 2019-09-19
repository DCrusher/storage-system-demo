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
import ProductDeleteConfirm from "./components/ProductDeleteConfirm";

const emptyProduct = {
  id: "",
  name: "",
  totalQuantity: 1,
  storages: [
    {
      storageId: "",
      quantity: 0
    }
  ]
};

const DIALOG_TITLES = {
  [instanceOperations.create]: "Creating product",
  [instanceOperations.edit]: "Editing product",
  [instanceOperations.delete]: "Deleting product"
};

const SUBMIT_CAPTIONS = {
  [instanceOperations.create]: "Create",
  [instanceOperations.delete]: "Delete",
  [instanceOperations.edit]: "Update"
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

  const handleDelete = (product: Product) => () => {
    deleteProduct(product);
    setInstanceOperation(instanceOperations.void);
  };

  const handleOpenDelete = (product: any) => {
    setInstanceOperation(instanceOperations.delete);
    setCurrentProduct(product);
  };

  const handleOpenEdit = (product: any) => {
    setInstanceOperation(instanceOperations.edit);
    setCurrentProduct(product);
  };

  const handleSubmitCreate = (productByStorages: ProductByStorages) => {
    createProduct(productByStorages);
    setInstanceOperation(instanceOperations.void);
  };

  const handleSubmitUpdate = (productByStorages: ProductByStorages) => {
    updateProduct(productByStorages);
    setInstanceOperation(instanceOperations.void);
  };

  const isDialogOpen = Boolean(instanceOperation);
  const isEdit = instanceOperation === instanceOperations.edit;
  const isDelete = instanceOperation === instanceOperations.delete;

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
      <ProductsList onDelete={handleOpenDelete} onEdit={handleOpenEdit} />
      {isDialogOpen && (
        <Dialog
          onClose={handleCloseDialog}
          title={DIALOG_TITLES[instanceOperation || ""]}
          open
        >
          {isDelete ? (
            <ProductDeleteConfirm onDelete={handleDelete(currentProduct)} />
          ) : (
            <ProductInstanceForm
              initialValues={currentProduct}
              onSubmit={isEdit ? handleSubmitUpdate : handleSubmitCreate}
              submitCaption={SUBMIT_CAPTIONS[instanceOperation || ""]}
            />
          )}
        </Dialog>
      )}
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
