import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { IMenu } from "../../../interface/menu.interface";
import ToggleEditSwitch from "../ToggleEditSwitch/ToggleEditSwitch";
import MenuCollapseContext from "../../../context/MenuCollapseContext";
import ToggleMenuButton from "../ToggleMenuButton/ToggleMenuButton";
import CollapseButton from "../CollapseButton";
import MenuListContext from "../../../context/MenuListContext";
import NestedMenu from "./NestedMen";
import menuService from "../../../services/menuServices";
import AddMenuModal from "../AddMenuModel/AddMenuModel";

// Styled Components
const SidebarContainer = styled(motion.div)`
  height: 100vh;
  background: #1e1e2f;
  color: white;
  padding: 20px;
  transition: width 0.3s ease;
`;

interface RefType {
  setValue: (menu: IMenu) => void;
}

const ClassicMenu = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const [isCollapsed, toggleCollpase] = useState(false);
  const [menus, setMenus] = useState<IMenu[]>([]);

  const [currentId, setCurrentId] = useState("");
  const [parentId, setParentId] = useState("");

  useEffect(() => {
    getMenus();
  }, []);

  const getMenus = () => {
    menuService.getMenu().then((data) => {
      setMenus(data.data);
      console.log("menu response => ", data);
    });
  };
  const [isModalOpen, setModalOpen] = useState(false);

  const saveMenus = (menus: IMenu[]) => {
    menuService.createMenus(menus).then(() => {
      getMenus();
    });
  };

  const ref = useRef<RefType>(null);
  return (
    <MenuCollapseContext value={{ isCollapsed }}>
      <SidebarContainer animate={{ width: isSidebarOpen ? 250 : 60 }}>
        <MenuListContext value={{ values: menus, setMenus }}>
          <AddMenuModal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            onSave={(data) => {
              saveMenus([data]);
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
            }}
          />
          <CollapseButton
            isCollapsed={isCollapsed}
            isSidebarOpen={isSidebarOpen}
            onToggle={() => toggleCollpase((prev) => !prev)}
          />
          <NestedMenu
            items={menus}
            isSidebarOpen={isSidebarOpen}
            onAdd={(id) => {
              setParentId(id);
              setModalOpen(true);
            }}
            onEdit={(menu) => {
              setCurrentId(menu._id!);
              if (ref) ref.current?.setValue(menu);
              setModalOpen(true);
            }}
          />
        </MenuListContext>
      </SidebarContainer>
    </MenuCollapseContext>
  );
};

export default ClassicMenu;
