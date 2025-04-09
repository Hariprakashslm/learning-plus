import React, { Ref, useImperativeHandle, useState } from 'react';
import { Dialog, DialogHeader, DialogTitle } from '../Dialog';
import Button from '../Button';

import styled from 'styled-components';
import FaIconsDropdown from '../FaIconsDropdown';
import { ICreateMenu, IMenu } from '../../../interface/menu.interface';
const StyledModalContent = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 14px;
  color: #333;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 10px;
`;

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

interface RefType {
  setValue: (menu: IMenu) => void;
}

const AddMenuModal = ({
  isOpen,
  onClose,
  onSave,
  ref,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (menu: IMenu) => void;
  ref: Ref<RefType>;
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('');
  const [_id, setId] = useState('');
  const [status, setStatus] = useState<IMenu['status']>('Active');

  const handleSubmit = () => {
    const newMenu: ICreateMenu = {
      name,
      description,
      status,
      icon,
    };
    if (_id) {
      newMenu._id = _id;
    }
    resetValues();
    onSave(newMenu);
  };

  const handleClose = () => {
    resetValues();
    onClose();
  };

  useImperativeHandle(ref, () => {
    return {
      setValue: (menu: IMenu) => {
        setId(menu._id || '');
        setName(menu.name);
        setDescription(menu.description || '');
        setIcon(menu?.icon || '');
        setStatus(menu.status);
      },
    };
  });

  const resetValues = () => {
    setId('');
    setName('');
    setDescription('');
    setIcon('');
    setStatus('Active');
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <StyledModalContent>
        <DialogHeader>
          <DialogTitle>{_id ? 'Edit Menu' : 'Add Menu'}</DialogTitle>
        </DialogHeader>

        <FormSection>
          <Label>Icon</Label>
          <FaIconsDropdown
            iconName={icon}
            onSelect={(iconName: string) => setIcon(iconName)}
          />
        </FormSection>

        <FormSection>
          <Label>Menu Name</Label>
          <Input
            placeholder="Enter menu name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormSection>

        <FormSection>
          <Label>Description</Label>
          <Textarea
            placeholder="Describe the menu"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormSection>

        <FormSection>
          <Label>Status</Label>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value as 'Active' | 'Inactive')}
          >
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
          </Select>
        </FormSection>

        <ButtonGroup>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save</Button>
        </ButtonGroup>
      </StyledModalContent>
    </Dialog>
  );
};

export default AddMenuModal;
