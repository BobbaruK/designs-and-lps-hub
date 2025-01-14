import { MenuAdminItem, MenuItem, MenuToolsItem } from "@/types";
import { GrValidate } from "react-icons/gr";
import { IoLanguage } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import {
  MdOutlineDesignServices,
  MdOutlineTopic,
  MdOutlineTypeSpecimen,
} from "react-icons/md";
import { SiBrandfolder } from "react-icons/si";
import { TbLicense } from "react-icons/tb";
import { VscFileSymlinkDirectory } from "react-icons/vsc";
import { FaUsers } from "react-icons/fa";

export const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LuLayoutDashboard,
  },
  {
    title: "Form Validation",
    url: "/form-validation",
    icon: GrValidate,
  },
  {
    title: "Topics",
    url: "/topic",
    icon: MdOutlineTopic,
  },
  {
    title: "Licenses",
    url: "/license",
    icon: TbLicense,
  },
  {
    title: "Landing page types",
    url: "/landing-page-type",
    icon: MdOutlineTypeSpecimen,
  },
  {
    title: "Languages",
    url: "/language",
    icon: IoLanguage,
  },
  {
    title: "Brands",
    url: "/brand",
    icon: SiBrandfolder,
  },
  {
    title: "Designs",
    url: "/design",
    icon: MdOutlineDesignServices,
  },
  {
    title: "Landing pages",
    url: "/landing-page",
    icon: VscFileSymlinkDirectory,
  },
];

export const menuToolsItems: MenuToolsItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LuLayoutDashboard,
  },
  {
    title: "Form Validation",
    url: "/form-validation",
    icon: GrValidate,
  },
];

export const menuAdminItems: MenuAdminItem[] = [
  {
    title: "Users",
    url: "/users",
    icon: FaUsers,
  },
];
