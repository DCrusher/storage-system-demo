import * as React from "react";
import styled from "styled-components";
import { Button, Badge } from "@material-ui/core";

interface Props {
  children: React.ReactNode;
  counter: number;
  onClick: () => void;
}

const FeatureWidget: React.FC<Props> = ({
  children,
  counter,
  onClick
}): JSX.Element => {
  return (
    <FeatureButton onClick={onClick} variant="contained" color="primary">
      <Badge badgeContent={counter} color="secondary">
        {children}
      </Badge>
    </FeatureButton>
  );
};

export default FeatureWidget;

const FeatureButton = styled(Button)`
  font-size: 30px;
  width: 400px;
  height: 400px;
`;
