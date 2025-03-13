import React from 'react';
import styled from 'styled-components';
import { FaEdit, FaEye } from 'react-icons/fa';

interface ToggleButtonProps {
  editMode: boolean;
  onToggle: () => void;
}

const Button = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: background 0.3s ease-in-out;

  &:hover {
    background: #0056b3;
  }
`;

const ToggleButton: React.FC<ToggleButtonProps> = ({ editMode, onToggle }) => {
  return (
    <Button onClick={onToggle}>
      {editMode ? <FaEye /> : <FaEdit />} {editMode ? 'View Mode' : 'Edit Mode'}
    </Button>
  );
};

export default ToggleButton;
