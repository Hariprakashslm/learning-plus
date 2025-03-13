import { useContext, useEffect, useState } from "react";
import EditModeContext from "../../../context/EditModeContext";
import MenuCollapseContext from "../../../context/MenuCollapseContext";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaChevronDown, FaChevronRight, FaEdit } from "react-icons/fa";
import Icons from "./Icon";
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
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {item.icon && <Icons iconName={item.icon} size={24} />}
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
                    <FaEdit onClick={(e) => e.stopPropagation()} />
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

export default NestedMenu;
