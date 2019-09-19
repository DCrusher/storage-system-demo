import * as React from "react";
import styled from "styled-components";
import MuiDialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

type MaxWidth = "xs" | "sm" | "md" | "lg" | "xl" | false;

interface Props {
  open: boolean;
  title: React.ReactNode;
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
  maxWidth?: MaxWidth;
  transitionDuration?: {
    enter?: number;
    exit?: number;
  };
}

interface DialogTitleProps {
  children: React.ReactNode;
  onClose?: () => void;
}

const DialogTitle: React.FC<DialogTitleProps> = ({ onClose, children }) => {
  return (
    <MuiDialogTitle>
      <TitleWrapper>
        {children}
        {onClose ? (
          <CloseButton aria-label="close" onClick={onClose}>
            <CloseIcon />
          </CloseButton>
        ) : null}
      </TitleWrapper>
    </MuiDialogTitle>
  );
};

const Dialog: React.FC<Props> = ({
  open,
  maxWidth,
  title,
  children,
  className,
  onClose,
  transitionDuration
}): JSX.Element => {
  return (
    <MuiDialog
      open={open}
      onClose={onClose}
      className={className}
      maxWidth={maxWidth}
      transitionDuration={transitionDuration}
    >
      <DialogTitle onClose={onClose}>{title}</DialogTitle>
      {children}
    </MuiDialog>
  );
};

export default Dialog;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled(IconButton)`
  margin-left: 20px;
`;
