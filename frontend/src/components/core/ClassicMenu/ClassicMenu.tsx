import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { IMenu } from "../../../interface/menu.interface";
import ToggleEditSwitch from "../ToggleEditSwitch/ToggleEditSwitch";
import MenuCollapseContext from "../../../context/MenuCollapseContext";
import ToggleMenuButton from "../ToggleMenuButton/ToggleMenuButton";
import CollapseButton from "../CollapseButton";
import MenuListContext from "../../../context/MenuListContext";
import NestedMenu from "./NestedMen";

// Styled Components
const SidebarContainer = styled(motion.div)`
  height: 100vh;
  background: #1e1e2f;
  color: white;
  padding: 20px;
  transition: width 0.3s ease;
`;

const ClassicMenu = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const [isCollapsed, toggleCollpase] = useState(false);
  const [menus, setMenus] = useState<IMenu[]>([]);
  return (
    <MenuCollapseContext value={{ isCollapsed }}>
      <SidebarContainer animate={{ width: isSidebarOpen ? 250 : 60 }}>
        <MenuListContext value={{ values: menus, setMenus }}>
          <ToggleMenuButton
            setSidebarOpen={(data) => setSidebarOpen(data)}
            isSidebarOpen={isSidebarOpen}
          />
          <ToggleEditSwitch isSidebarOpen={isSidebarOpen} />
          <CollapseButton
            isCollapsed={isCollapsed}
            isSidebarOpen={isSidebarOpen}
            onToggle={() => toggleCollpase((prev) => !prev)}
          />
          <NestedMenu items={menus} isSidebarOpen={isSidebarOpen} />
        </MenuListContext>
      </SidebarContainer>
    </MenuCollapseContext>
  );
};

export default ClassicMenu;
