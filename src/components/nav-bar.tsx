import React, { useState } from 'react';
import styled from 'styled-components';
import { FaBars, FaTimes } from 'react-icons/fa';

// Styled Components
const NavbarContainer = styled.nav`
  background: #007bff;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  font-family: 'Arial', sans-serif;
  position: relative;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.h1`
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #f8f9fa;
  }
`;

const NavLinks = styled.ul<{ isOpen: boolean }>`
  list-style: none;
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    position: absolute;
    top: 60px;
    right: 0;
    background: #007bff;
    width: 100%;
    text-align: center;
    padding: 10px 0;
    transition: all 0.3s ease-in-out;
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  }
`;

const NavLink = styled.li`
  cursor: pointer;
  font-size: 18px;
  padding: 10px 15px;
  transition: background 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 5px;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

// Navbar Component
const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <NavbarContainer>
      <Logo>MySite</Logo>
      <MenuButton onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </MenuButton>
      <NavLinks isOpen={isOpen}>
        <NavLink>Home</NavLink>
        <NavLink>About</NavLink>
        <NavLink>Services</NavLink>
        <NavLink>Contact</NavLink>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;
