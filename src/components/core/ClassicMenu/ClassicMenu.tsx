import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaBars, FaChevronDown, FaChevronRight } from "react-icons/fa";

import * as FaIcons from "react-icons/fa";
import { IMenu } from "../../../interface/menu.interface";
import EditModeSwitch from "../ToggleEditSwitch/ToggleEditSwitch";
import EditModeContext from "../../../context/EditModeContext";
import MenuCollapseContext from "../../../context/MenuCollapseContext";
import ToggleMenuButton from "../ToggleMenuButton/ToggleMenuButton";
import AddMenuModal from "../AddMenuModel/AddMenuModel";
import CollapseButton from "../CollapseButton";

const IconComponent = ({
  iconName,
  size,
}: {
  iconName: string;
  size: number;
}) => {
  const Icon = FaIcons[iconName as keyof typeof FaIcons];
  return <Icon size={size} />;
};
// Styled Components
const SidebarContainer = styled(motion.div)`
  height: 100vh;
  background: #1e1e2f;
  color: white;
  padding: 20px;
  transition: width 0.3s ease;
`;

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
}: {
  items: any[];
  isSidebarOpen: boolean;
}) => {
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const [isModalOpen, setModalOpen] = useState(false);
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
      <AddMenuModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={() => {}}
      />
      {items.map((item, index) => (
        <div key={index}>
          <MenuItem onClick={() => item.subMenu && toggleSubMenu(item.name)}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {item.icon && <IconComponent iconName={item.icon} size={24} />}
              {isSidebarOpen && (
                <span style={{ marginLeft: 10 }}>{item.name}</span>
              )}
            </div>
            {isSidebarOpen && (
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                {editModeContext?.isEditMode && (
                  <>
                    <FaIcons.FaEdit onClick={(e) => e.stopPropagation()} />
                    <FaIcons.FaPlus
                      onClick={(e) => {
                        e.stopPropagation();
                        setModalOpen(true);
                      }}
                    />
                  </>
                )}

                {item.subMenu && (
                  <span style={{ marginLeft: "auto" }}>
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

          {item.subMenu && (
            <SubMenuContainer
              animate={{ height: openMenus[item.name] ? "auto" : 0 }}
            >
              {item.subMenu && (
                <NestedMenu
                  items={item.subMenu}
                  isSidebarOpen={isSidebarOpen}
                />
              )}
            </SubMenuContainer>
          )}
        </div>
      ))}{" "}
    </>
  );
};

const ClassicMenu = ({ menus }: { menus: IMenu[] }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const [isCollapsed, toggleCollpase] = useState(false);
  return (
    <MenuCollapseContext value={{ isCollapsed }}>
      <SidebarContainer animate={{ width: isSidebarOpen ? 250 : 60 }}>
        <ToggleMenuButton
          setSidebarOpen={(data) => setSidebarOpen(data)}
          isSidebarOpen={isSidebarOpen}
        />
        <EditModeSwitch isSidebarOpen={isSidebarOpen} />
        <CollapseButton
          isCollapsed={isCollapsed}
          isSidebarOpen={isSidebarOpen}
          onToggle={() => toggleCollpase((prev) => !prev)}
        />
        <NestedMenu items={menus} isSidebarOpen={isSidebarOpen} />
      </SidebarContainer>
    </MenuCollapseContext>
  );
};

export default ClassicMenu;
