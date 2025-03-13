import React from "react";
import { FaBars } from "react-icons/fa";
import styled from "styled-components";

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 20px;
  margin-bottom: 20px;
`;

const ToggleMenuButton: React.FC<{
  setSidebarOpen: (data: boolean) => void;
  isSidebarOpen: boolean;
}> = ({ setSidebarOpen, isSidebarOpen }) => {
  return (
    <ToggleButton onClick={() => setSidebarOpen(!isSidebarOpen)}>
      <FaBars />
    </ToggleButton>
  );
};

export default ToggleMenuButton;
