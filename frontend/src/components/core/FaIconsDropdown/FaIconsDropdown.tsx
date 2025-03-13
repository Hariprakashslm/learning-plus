import React, { useState } from "react";
import styled from "styled-components";
import * as FaIcons from "react-icons/fa";

// Styled Components
const DropdownContainer = styled.div`
  position: relative;
  width: 250px;
  font-family: Arial, sans-serif;
  color: #000;
`;

const DropdownButton = styled.button`
  width: 100%;
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    background: #0056b3;
  }
`;

const DropdownList = styled.div`
  position: absolute;
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  background: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
  margin-top: 5px;
`;

const SearchInput = styled.input`
  width: 90%;
  padding: 8px;
  margin: 5px auto;
  display: block;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
`;

const IconItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #f0f0f0;
  }
`;

const SelectedIcon = styled.span`
  font-size: 20px;
`;

const IconName = styled.span`
  font-size: 14px;
`;

// Main Component
const FaIconsDropdown: React.FC<{ onSelect: (data: string) => void }> = ({
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // Get all FontAwesome icons
  const iconEntries = Object.entries(FaIcons).filter(([name]) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (iconName: string) => {
    onSelect(iconName);
    setSelectedIcon(iconName);
    setIsOpen(false);
  };

  const SelectedIconComponent = selectedIcon
    ? FaIcons[selectedIcon as keyof typeof FaIcons]
    : null;

  return (
    <DropdownContainer>
      {/* Dropdown Button */}
      <DropdownButton onClick={() => setIsOpen(!isOpen)}>
        {selectedIcon && SelectedIconComponent ? (
          <>
            <SelectedIconComponent size={20} />
            <span>{selectedIcon}</span>
          </>
        ) : (
          "Select an Icon"
        )}
      </DropdownButton>

      {/* Dropdown List */}
      {isOpen && (
        <DropdownList>
          <SearchInput
            type="text"
            placeholder="Search icons..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {iconEntries.map(([iconName, IconComponent]) => (
            <IconItem key={iconName} onClick={() => handleSelect(iconName)}>
              <IconComponent size={20} />
              <IconName>{iconName}</IconName>
            </IconItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
};

export default FaIconsDropdown;
