import { useContext, useEffect, useState } from 'react';
import EditModeContext from '../../../context/EditModeContext';
import MenuCollapseContext from '../../../context/MenuCollapseContext';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronRight, FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import Icons from './Icon';
import { IMenu } from '../../../interface/menu.interface';

interface NestedMenuProps {
  items: IMenu[];
  isSidebarOpen: boolean;
  onAdd: (parentId: string) => void;
  onEdit: (menu: IMenu) => void;
  onDelete: (id: string) => void;
}

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.25s ease;
  position: relative;
  background: #1e1e2f;
  border: 1px solid #2c2c40;
  margin-bottom: 8px;

  &:hover {
    background: #2b2b45;
    transform: scale(1.01);
    box-shadow: 0 0 5px #4b4bff44;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ChevronIcon = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
`;

const SubMenuContainer = styled(motion.div)`
  margin-left: 20px;
  padding-left: 10px;
  border-left: 2px solid #444;
  overflow: hidden;
`;

const NestedMenu: React.FC<NestedMenuProps> = ({
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
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleSubMenu = (id: string) => {
    setOpenMenus((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const editModeContext = useContext(EditModeContext);
  const collapsedContext = useContext(MenuCollapseContext);

  useEffect(() => {
    const initialOpenMenus = items.reduce<Record<string, boolean>>(
      (acc, item) => {
        acc[item._id || ''] = !collapsedContext?.isCollapsed;
        return acc;
      },
      {}
    );
    setOpenMenus(initialOpenMenus);
  }, [collapsedContext, items]);

  return (
    <>
      {items.map((item) => {
        const isOpen = openMenus[item._id || ''];

        return (
          <div key={item._id}>
            <MenuItem
              onClick={() => item.subMenu?.length && toggleSubMenu(item._id!)}
            >
              <IconWrapper>
                {item.icon && (
                  <Icons iconName={item.icon} size={20} color="#ccc" />
                )}
                {isSidebarOpen && <span>{item.name}</span>}
              </IconWrapper>

              {isSidebarOpen && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  {editModeContext?.isEditMode && (
                    <>
                      <FaEdit
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(item);
                        }}
                        style={{ cursor: 'pointer' }}
                      />
                      <FaPlus
                        onClick={(e) => {
                          e.stopPropagation();
                          onAdd(item._id!);
                        }}
                        style={{ cursor: 'pointer' }}
                      />
                      <FaTrash
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(item._id!);
                        }}
                        style={{ cursor: 'pointer' }}
                      />
                    </>
                  )}

                  {!!item.subMenu?.length && (
                    <ChevronIcon
                      animate={{ rotate: isOpen ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaChevronRight />
                    </ChevronIcon>
                  )}
                </div>
              )}
            </MenuItem>

            <AnimatePresence initial={false}>
              {!!item.subMenu?.length && isOpen && (
                <SubMenuContainer
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                >
                  <NestedMenu
                    items={item.subMenu}
                    isSidebarOpen={isSidebarOpen}
                    onAdd={onAdd}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                </SubMenuContainer>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </>
  );
};

export default NestedMenu;
