import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ICreateMenu, IMenu } from '../../../interface/menu.interface';
import ToggleEditSwitch from '../ToggleEditSwitch/ToggleEditSwitch';
import MenuCollapseContext from '../../../context/MenuCollapseContext';
import ToggleMenuButton from '../ToggleMenuButton/ToggleMenuButton';
import CollapseButton from '../CollapseButton';
import MenuListContext from '../../../context/MenuListContext';
import NestedMenu from './NestedMen';
import menuService from '../../../services/menuServices';
import AddMenuModal from '../AddMenuModel/AddMenuModel';

// Styled Components
const SidebarContainer = styled(motion.div)`
  background: #1e1e2f;
  color: white;
  padding: 20px;
  transition: width 0.3s ease;
  z-index: 999;
`;

interface RefType {
  setValue: (menu: IMenu) => void;
}

const ClassicMenu = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const [isCollapsed, toggleCollpase] = useState(false);
  const [menus, setMenus] = useState<IMenu[]>([]);

  const [parentId, setParentId] = useState('');

  useEffect(() => {
    getMenus();
  }, []);

  const getMenus = () => {
    menuService.getMenu().then((data) => {
      setMenus(data.data);
    });
  };
  const [isModalOpen, setModalOpen] = useState(false);
  const createMenus = (menus: ICreateMenu[]) => {
    menuService.createMenus(menus).then(() => {
      getMenus();
      setModalOpen(false);
    });
  };
  const saveMenus = (menu: ICreateMenu) => {
    menuService.updateMenu(menu).then(() => {
      getMenus();
      setModalOpen(false);
    });
  };

  const ref = useRef<RefType>(null);
  return (
    <MenuCollapseContext value={{ isCollapsed }}>
      <SidebarContainer animate={{ width: isSidebarOpen ? 'auto' : 60 }}>
        <MenuListContext value={{ values: menus, setMenus }}>
          <AddMenuModal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            onSave={(data) => {
              if (!data?._id) {
                const currentData: ICreateMenu = data;
                if (parentId) {
                  currentData.parentId = parentId;
                }
                createMenus([currentData]);
              } else {
                saveMenus(data);
              }
            }}
            ref={ref}
          />
          <ToggleMenuButton
            setSidebarOpen={(data) => setSidebarOpen(data)}
            isSidebarOpen={isSidebarOpen}
          />
          <ToggleEditSwitch
            isSidebarOpen={isSidebarOpen}
            onAdd={() => {
              setModalOpen(true);
              setParentId('');
            }}
          />
          <CollapseButton
            isCollapsed={isCollapsed}
            isSidebarOpen={isSidebarOpen}
            onToggle={() => toggleCollpase((prev) => !prev)}
          />
          <div style={{ marginTop: '20px' }}>
            <NestedMenu
              items={menus}
              isSidebarOpen={isSidebarOpen}
              onAdd={(id) => {
                setParentId(id);
                setModalOpen(true);
              }}
              onEdit={(menu) => {
                setParentId('');
                if (ref) ref.current?.setValue(menu);
                setModalOpen(true);
              }}
              onDelete={(id) => {
                menuService.deleteMenu(id).then(() => {
                  getMenus();
                });
              }}
            />
          </div>
        </MenuListContext>
      </SidebarContainer>
    </MenuCollapseContext>
  );
};

export default ClassicMenu;
