import React, { useState } from 'react';
import {
  Dialog,
  DialogHeader,
  DialogTitle,
} from './components/dialog.component.tsx';
import { Button } from './components/button.component.tsx';

import styled from 'styled-components';
import FaIconsDropdown from './components/icon-select.componet.tsx';

export const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const SelectItem = styled.option``;

export const Textarea = styled.textarea`
  width: 95%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  resize: vertical;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

export const Input = styled.input`
  width: 95%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

interface Menu {
  _id: number;
  name: string;
  description: string;
  status: 'Active' | 'Inactive';
  createdAt: Date;
  updatedAt: Date;
  subMenu?: Menu[];
}

const AddMenuModal = ({
  isOpen,
  onClose,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (menu: Menu) => void;
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<Menu['status']>('Active');

  const handleSubmit = () => {
    const newMenu: Menu = {
      _id: Date.now(),
      name,
      description,
      status,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    onSave(newMenu);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogHeader>
        <DialogTitle>Add Menu</DialogTitle>
      </DialogHeader>
      <FaIconsDropdown />
      <Input
        placeholder="Menu Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Select
        value={status}
        onChange={(e) => setStatus(e.target.value as 'Active' | 'Inactive')}
      >
        <SelectItem value="Active">Active</SelectItem>
        <SelectItem value="Inactive">Inactive</SelectItem>
      </Select>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Save</Button>
      </div>
    </Dialog>
  );
};

export default AddMenuModal;
