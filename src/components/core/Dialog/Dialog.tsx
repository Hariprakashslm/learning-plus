import React from "react";
import styled from "styled-components";
import Overlay from "./Overlay";
import DialogBox from "./DialogBox";

export const Dialog = ({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: () => void;
  children: React.ReactNode;
}) => {
  if (!open) return null;
  return (
    <Overlay onClick={onOpenChange}>
      <DialogBox onClick={(e) => e.stopPropagation()}>{children}</DialogBox>
    </Overlay>
  );
};
