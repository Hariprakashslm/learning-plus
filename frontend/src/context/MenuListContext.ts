import { createContext } from "react";
import { IMenu } from "../interface/menu.interface";

const MenuListContext = createContext<{
  values: IMenu[];
  setMenus: (menu: IMenu[]) => void;
}>({
  setMenus: (menu: IMenu[]) => {},
  values: [],
});

export default MenuListContext;
