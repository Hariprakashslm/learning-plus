import React, { Ref, useImperativeHandle, useState } from "react";
import { Dialog, DialogHeader, DialogTitle } from "../Dialog";
import Button from "../Button";

import styled from "styled-components";
import FaIconsDropdown from "../FaIconsDropdown";
import { IMenu } from "../../../interface/menu.interface";

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
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [status, setStatus] = useState<IMenu["status"]>("Active");

  const handleSubmit = () => {
    const newMenu: IMenu = {
      name,
      description,
      status,
      icon,
    };
    onSave(newMenu);
    resetValues();
  };

  const handleClose = () => {
    resetValues();
    onClose();
  };

  useImperativeHandle(ref, () => {
    return {
      setValue: (menu: IMenu) => {
        console.log("set value => ", menu);
        setName(menu.name);
        setDescription(menu.description || "");
        setIcon(menu?.icon || "");
        setStatus(menu.status);
      },
    };
  });

  const resetValues = () => {
    setName("");
    setDescription("");
    setIcon("");
    setStatus("Active");
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogHeader>
        <DialogTitle>Add Menu</DialogTitle>
      </DialogHeader>
      <FaIconsDropdown
        iconName={icon}
        onSelect={(iconName: string) => {
          setIcon(iconName);
        }}
      />
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
        onChange={(e) => setStatus(e.target.value as "Active" | "Inactive")}
      >
        <SelectItem value="Active">Active</SelectItem>
        <SelectItem value="Inactive">Inactive</SelectItem>
      </Select>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
        <Button variant="outline" onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Save</Button>
      </div>
    </Dialog>
  );
};

export default AddMenuModal;
