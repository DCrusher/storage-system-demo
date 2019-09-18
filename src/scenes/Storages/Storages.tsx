import * as React from "react";
import styled from "styled-components";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { Divider } from "@material-ui/core";

import Dialog from "components/Dialog";
import instanceOperations from "constants/instanceOperations";
import Storage, { StorageWithProducts } from "models/Storage";

import StorageInstanceForm from "./components/StorageInstanceForm";
import StorageRedistributionForm from "./components/StorageRedistributionForm";
import StoragesList from "./components/StoragesList";
import { deleteStorage, createStorage, updateStorage } from "store/storages";
import { redistributeStorage } from "store/storagesProducts";

const emptyStorage = {
  id: "",
  name: "",
  products: [
    {
      productId: "",
      quantity: 0
    }
  ]
};

const DIALOG_TITLES = {
  [instanceOperations.create]: "Creating storage",
  [instanceOperations.edit]: "Editing storage",
  [instanceOperations.redistribute]: "Redestribute before delete"
};

const SUBMIT_CAPTIONS = {
  [instanceOperations.create]: "Create",
  [instanceOperations.edit]: "Update",
  [instanceOperations.redistribute]: "Redestribute and delete"
};

// interface InstanceActionProps {
//   operation: "create" | "edit" | "redistribute";
// }

// const StorageInstanceAction: React.FC<InstanceActionProps> = ({
//   operation
// }): JSX.Element => {
//   if (operation === instanceOperations.redistribute) {
//     return <span>redistrubute</span>;
//   } else {
//     return;
//   }
//   // {
//   //   instanceOperation === instanceOperations.redistribute ? (
//   //     <span>redestribution</span>
//   //   ) : (
//   //     <StorageInstanceForm
//   //       initialValues={currentStorage}
//   //       onSubmit={isEdit ? handleSubmitUpdate : handleSubmitCreate}
//   //       submitCaption={SUBMIT_CAPTIONS[instanceOperation]}
//   //     />
//   //   );
//   // }
// };

const Storages: React.FC = () => {
  const [instanceOperation, setInstanceOperation] = React.useState<
    string | null
  >(instanceOperations.void);
  const [currentStorage, setCurrentStorage] = React.useState<
    StorageWithProducts | Storage
  >(emptyStorage);

  const handleOpenAddDialog = () => {
    setInstanceOperation(instanceOperations.create);
    setCurrentStorage(emptyStorage);
  };

  const handleCloseDialog = () => {
    setInstanceOperation(instanceOperations.void);
  };

  const handleOpensDelete = (storage: Storage) => {
    setCurrentStorage(storage);
    setInstanceOperation(instanceOperations.redistribute);
    // deleteStorage(storage);
  };

  const handleOpenEdit = (storageWithProducts: any) => {
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

  const handleRedistributeAndDelete = (values: any, storage: Storage) => {
    redistributeStorage({ storage, allocation: values });
    deleteStorage(storage);
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
      <StoragesList onDelete={handleOpensDelete} onEdit={handleOpenEdit} />
      {Boolean(instanceOperation) && (
        <Dialog
          open
          onClose={handleCloseDialog}
          title={instanceOperation && DIALOG_TITLES[instanceOperation]}
        >
          {instanceOperation === instanceOperations.redistribute ? (
            <StorageRedistributionForm
              submitCaption={SUBMIT_CAPTIONS[instanceOperation || ""]}
              storage={currentStorage}
              onSubmit={handleRedistributeAndDelete}
            />
          ) : (
            <StorageInstanceForm
              initialValues={currentStorage}
              onSubmit={isEdit ? handleSubmitUpdate : handleSubmitCreate}
              submitCaption={SUBMIT_CAPTIONS[instanceOperation || ""]}
            />
          )}
        </Dialog>
      )}
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
