import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`;

const DialogBox = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 450px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const DialogHeader = styled.div`
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 15px;
`;

const DialogTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #000;
`;

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

export { DialogHeader, DialogTitle };
