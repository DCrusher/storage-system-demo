import * as React from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import Dialog from "components/Dialog";
import instanceOperations from "constants/instanceOperations";

import StorageInstanceForm from "./components/StorageInstanceForm";

const Storages: React.FC = () => {
  const [instanceOperation, setInstanceOperation] = React.useState<
    string | null
  >(instanceOperations.void);

  const handleOpenAddDialog = () => {
    setInstanceOperation(instanceOperations.create);
  };

  const handleCloseDialog = () => {
    setInstanceOperation(instanceOperations.void);
  };

  return (
    <>
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
      <Dialog
        open={Boolean(instanceOperation)}
        onClose={handleCloseDialog}
        title="Creating storage"
      >
        <StorageInstanceForm />
      </Dialog>
    </>
  );
};

export default Storages;
