import axios from 'axios';
import { IMenu } from '../interface/menu.interface';

const contentervice = {
  getMenu: () => axios.get<IMenu[]>('http://localhost:4000/content'),
  createcontent: (data: IMenu[]) =>
    axios.post('http://localhost:4000/content', data),
  updateMenu: (data: IMenu) =>
    axios.put(`http://localhost:4000/content/${data._id}`, data),
  deleteMenu: (id: string) =>
    axios.delete(`http://localhost:4000/content/${id}`),
};

export default contentervice;
