import * as React from "react";
import styled from "styled-components";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { Divider } from "@material-ui/core";

import Dialog from "components/Dialog";
import instanceOperations from "constants/instanceOperations";
import Storage, { StorageWithProducts } from "models/Storage";

import StorageInstanceForm from "./components/StorageInstanceForm";
import StoragesList from "./components/StoragesList";
import { deleteStorage, createStorage, updateStorage } from "store/storages";

const emptyStorage = {
  id: "",
  name: "",
  products: []
};

const DIALOG_TITLES = {
  create: "Creating storage",
  edit: "Editing storage"
};

const SUBMIT_CAPTIONS = {
  create: "Create",
  edit: "Update"
};

const Storages: React.FC = () => {
  const [instanceOperation, setInstanceOperation] = React.useState<
    string | null
  >(instanceOperations.void);
  const [currentStorage, setCurrentStorage] = React.useState<
    StorageWithProducts
  >(emptyStorage);

  const handleOpenAddDialog = () => {
    setInstanceOperation(instanceOperations.create);
  };

  const handleCloseDialog = () => {
    setInstanceOperation(instanceOperations.void);
  };

  const handleDelete = (storage: Storage) => {
    deleteStorage(storage);
  };

  const handleOpenEdit = (storageWithProducts: any) => {
    // const storageToEdit = { ...storage, products: [] };
    setInstanceOperation(instanceOperations.edit);
    setCurrentStorage(storageWithProducts);
  };

  const handleSubmitCreate = (storageWithProducts: StorageWithProducts) => {
    createStorage(storageWithProducts);
    setInstanceOperation(instanceOperations.void);
  };

  const handleSubmitUpdate = (storageWithProducts: StorageWithProducts) => {
    updateStorage(storageWithProducts);
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
        Add storage
      </Fab>
      <ToolbarDivider />
      <StoragesList onDelete={handleDelete} onEdit={handleOpenEdit} />
      <Dialog
        open={Boolean(instanceOperation)}
        onClose={handleCloseDialog}
        title={isEdit ? DIALOG_TITLES.edit : DIALOG_TITLES.create}
      >
        <StorageInstanceForm
          initialValues={currentStorage}
          onSubmit={isEdit ? handleSubmitUpdate : handleSubmitCreate}
          submitCaption={isEdit ? SUBMIT_CAPTIONS.edit : SUBMIT_CAPTIONS.create}
        />
      </Dialog>
    </Wrapper>
  );
};

export default Storages;

const Wrapper = styled.div`
  width: 100%;
`;

const ToolbarDivider = styled(Divider)`
  margin: 20px 0;
`;
