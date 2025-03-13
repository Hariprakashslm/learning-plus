type MenuStatus = "Active" | "Inactive";

export interface IMenu {
  _id?: string;
  name: string;
  icon?: string;
  description?: string;
  status: MenuStatus;
  createdAt?: Date;
  updatedAt?: Date;
  subMenu?: IMenu[]; // Optional nested sub-menu
}
