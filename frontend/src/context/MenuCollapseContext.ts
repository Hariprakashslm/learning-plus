import { createContext } from "react";
interface MenuCollapseContextType {
  isCollapsed: boolean;
}
const MenuCollapseContext = createContext<MenuCollapseContextType | undefined>(
  undefined
);

export default MenuCollapseContext;
