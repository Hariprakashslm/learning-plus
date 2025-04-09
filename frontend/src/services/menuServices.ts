import axios from 'axios';
import { IMenu } from '../interface/menu.interface';

const menuService = {
  getMenu: () => axios.get<IMenu[]>('http://localhost:4000/menus'),
  createMenus: (data: IMenu[]) =>
    axios.post('http://localhost:4000/menus', data),
  updateMenu: (data: IMenu) =>
    axios.put(`http://localhost:4000/menus/${data._id}`, data),
  deleteMenu: (id: string) => axios.delete(`http://localhost:4000/menus/${id}`),
};

export default menuService;
