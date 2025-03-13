import React, { use, useState } from 'react';
import styled from 'styled-components';
import { FaChevronDown, FaChevronRight, FaEdit, FaPlus } from 'react-icons/fa';
import EditModeContext from '../context/editMode.context';
import AddMenuModal from './add-menu-model/add-menu-model';
import { Button } from './add-menu-model/components/button.component';

// TypeScript type definitions
type MenuStatus = 'Active' | 'Inactive';

interface Menu {
  _id: number;
  name: string;
  description: string;
  status: MenuStatus;
  createdAt: Date;
  updatedAt: Date;
  subMenu?: Menu[];
}

// Styled Components
const MenuContainer = styled.div<{ ismain: string }>`
  margin: 20px auto;
  font-family: 'Arial', sans-serif;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 15px;

  ${(props) => {
    return props.ismain === 'true' ? 'height:100vh;width: 300px;' : '';
  }}
`;

const MenuItem = styled.div<{ status: MenuStatus }>`
  background: ${({ status }) => (status === 'Active' ? '#4CAF50' : '#FF5722')};
  color: white;
  padding: 12px;
  margin: 5px 0;
  border-radius: 5px;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: background 0.3s ease-in-out;

  &:hover {
    background: ${({ status }) =>
      status === 'Active' ? '#388E3C' : '#E64A19'};
  }
`;

const SubMenuContainer = styled.div`
  margin-left: 20px;
  border-left: 2px solid #ddd;
  padding-left: 10px;
  margin-top: 5px;
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
`;

const IconWrapper = styled.span`
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
`;
const ToggleAllButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  display: block;
  width: 100%;
  text-align: center;
  margin-bottom: 10px;
  transition: background 0.3s;

  &:hover {
    background: #0056b3;
  }
`;
// Collapsible Menu Component
const MenuComponent: React.FC<{
  menus: Menu[];
  ismain?: string;
}> = ({ menus, ismain = 'true' }) => {
  const isEditMode = use(EditModeContext);
  const [openMenus, setOpenMenus] = useState<{ [key: number]: boolean }>({});
  const [isModalOpen, setModalOpen] = useState(false);
  // const [menus, setMenus] = useState([]);

  const handleSaveMenu = (menu: unknown) => {
    console.log({ menu });
    // setMenus([...menus, menu]);
  };

  const [allOpen, setAllOpen] = useState(false);

  // Toggle a specific submenu
  const toggleSubMenu = (id: number) => {
    setOpenMenus((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleAllMenus = () => {
    const newStatus = !allOpen;

    const updateMenuStatus = (
      menuList: Menu[],
      status: boolean
    ): { [key: number]: boolean } => {
      return menuList.reduce((acc, menu) => {
        acc[menu._id] = status;
        if (menu.subMenu) {
          Object.assign(acc, updateMenuStatus(menu.subMenu, status)); // Recursively update nested submenus
        }
        return acc;
      }, {} as { [key: number]: boolean });
    };

    const updatedMenus = updateMenuStatus(menus, newStatus);
    setOpenMenus(updatedMenus);
    setAllOpen(newStatus);
  };

  return (
    <MenuContainer ismain={ismain}>
      <AddMenuModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveMenu}
      />
      {ismain && (
        <ToggleAllButton onClick={toggleAllMenus}>
          {allOpen ? 'Close All Menus' : 'Open All Menus'}
        </ToggleAllButton>
      )}

      {menus.map((menu) => (
        <div key={menu._id}>
          <MenuItem
            status={menu.status}
            onClick={() => toggleSubMenu(menu._id)}
          >
            {menu.name}

            {(menu.subMenu || isEditMode) && (
              <IconWrapper>
                {isEditMode && (
                  <>
                    <FaEdit onClick={(e) => e.stopPropagation()} />
                    <FaPlus onClick={() => setModalOpen(true)} />
                  </>
                )}
                {menu.subMenu &&
                  (openMenus[menu._id] ? (
                    <FaChevronDown />
                  ) : (
                    <FaChevronRight />
                  ))}
              </IconWrapper>
            )}
          </MenuItem>
          {menu.subMenu && openMenus[menu._id] && (
            <SubMenuContainer>
              <MenuComponent menus={menu.subMenu} ismain={'false'} />
            </SubMenuContainer>
          )}
        </div>
      ))}
    </MenuContainer>
  );
};

export default MenuComponent;
