import React from 'react';
import styled from 'styled-components';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';

const Button = styled.div`
  background: #fff;
  color: green;
  padding: 8px 16px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease-in-out;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  margin-top: 10px;
`;

const Icon = styled.span`
  font-size: 20px;
`;

interface CollapseMenuButtonProps {
  isCollapsed: boolean;
  isSidebarOpen: boolean;
  onToggle: () => void;
}

const CollapseMenuButton: React.FC<CollapseMenuButtonProps> = ({
  isCollapsed,
  onToggle,
  isSidebarOpen,
}) => {
  return (
    <Button onClick={onToggle}>
      <Icon>
        {isCollapsed ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
      </Icon>
      {isSidebarOpen && (isCollapsed ? 'Expand Menu' : 'Collapse Menu')}
    </Button>
  );
};

export default CollapseMenuButton;
