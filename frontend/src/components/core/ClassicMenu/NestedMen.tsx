import { useCallback, useContext, useEffect, useState } from 'react';
import EditModeContext from '../../../context/EditModeContext';
import MenuCollapseContext from '../../../context/MenuCollapseContext';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  FaChevronDown,
  FaChevronRight,
  FaEdit,
  FaPlus,
  FaTrash,
} from 'react-icons/fa';
import Icons from './Icon';
import { IMenu } from '../../../interface/menu.interface';
import menuService from '../../../services/menuServices';
const MenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background: #33334d;
  }
`;

const SubMenuContainer = styled(motion.div)`
  overflow: hidden;
  margin-left: 20px;
`;

// Recursive Menu Rendering Component
const NestedMenu = ({
  items,
  isSidebarOpen,
  onAdd,
  onEdit,
  onDelete,
}: {
  items: any[];
  isSidebarOpen: boolean;
  onAdd: (parentId: string) => void;
  onEdit: (menu: IMenu) => void;
  onDelete: (id: string) => void;
}) => {
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const toggleSubMenu = (name: string) => {
    setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };
  const editModeContext = useContext(EditModeContext);
  const collpased = useContext(MenuCollapseContext);

  useEffect(() => {
    setOpenMenus(
      items.reduce((prev, item) => {
        prev[item.name] = !!collpased?.isCollapsed;
        return prev;
      }, {})
    );
  }, [collpased]);

  return (
    <>
      {items.map((item, index) => (
        <div key={index}>
          <MenuItem onClick={() => item.subMenu && toggleSubMenu(item.name)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {item.icon && <Icons iconName={item.icon} size={24} />}
              {isSidebarOpen && (
                <span style={{ marginLeft: 10 }}>{item.name}</span>
              )}
            </div>
            {isSidebarOpen && (
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
              >
                {editModeContext?.isEditMode && (
                  <>
                    <FaEdit
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(item);
                      }}
                    />
                    <FaPlus
                      onClick={(e) => {
                        e.stopPropagation();
                        onAdd(item._id);
                      }}
                    />
                    <FaTrash
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(item._id);
                      }}
                    />
                  </>
                )}

                {!!item.subMenu.length && (
                  <span style={{ marginLeft: 'auto' }}>
                    {openMenus[item.name] ? (
                      <FaChevronDown />
                    ) : (
                      <FaChevronRight />
                    )}
                  </span>
                )}
              </div>
            )}
          </MenuItem>

          {!!item.subMenu.length && (
            <SubMenuContainer
              animate={{ height: openMenus[item.name] ? 'auto' : 0 }}
            >
              {item.subMenu && (
                <NestedMenu
                  items={item.subMenu}
                  isSidebarOpen={isSidebarOpen}
                  onAdd={onAdd}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              )}
            </SubMenuContainer>
          )}
        </div>
      ))}{' '}
    </>
  );
};

export default NestedMenu;
