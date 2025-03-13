import axios from "axios";
import { IMenu } from "../interface/menu.interface";

const menuService = {
  getMenu: () => axios.get<IMenu[]>("http://localhost:4000/menus"),
  createMenus: (data: IMenu[]) =>
    axios.post("http://localhost:4000/menus", data),
};

export default menuService;
