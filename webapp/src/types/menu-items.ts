import { IconType } from "react-icons/lib";

export interface MenuItem {
  title: string;
  url: string;
  icon: IconType;
}

export type MenuToolsItem = MenuItem;

export type MenuAdminItem = MenuItem;
