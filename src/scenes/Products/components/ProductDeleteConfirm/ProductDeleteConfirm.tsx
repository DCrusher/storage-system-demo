import * as React from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";

interface Props {
  onDelete: () => void;
}

const ProductDeleteConfirm: React.FC<Props> = ({ onDelete }): JSX.Element => {
  return (
    <>
      <PlaceholderText>
        <div>Are you shure to delete the product? </div>
        <div>It will removed from all storages.</div>
      </PlaceholderText>
      <ActionButton
        variant="contained"
        color="primary"
        size="large"
        onClick={onDelete}
      >
        delete
      </ActionButton>
    </>
  );
};

export default ProductDeleteConfirm;

const ActionButton = styled(Button)`
  margin-top: 40px;
  width: 100%;
  border-radius: 0;
`;

const PlaceholderText = styled.div`
  text-align: center;
`;
