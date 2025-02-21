import { MenuAdminItem, MenuItem, MenuToolsItem } from "@/types/menu-items";
import { AiOutlinePicture } from "react-icons/ai";
import { GrValidate } from "react-icons/gr";
import { IoLanguage } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import {
  MdOutlineDesignServices,
  MdOutlineFeaturedPlayList,
  MdOutlineTopic,
  MdOutlineTypeSpecimen,
} from "react-icons/md";
import { PiUsersThree } from "react-icons/pi";
import { RxAvatar } from "react-icons/rx";
import { SiBrandfolder } from "react-icons/si";
import { TbFlag, TbImageInPicture, TbLicense } from "react-icons/tb";
import { VscFileSymlinkDirectory } from "react-icons/vsc";

export const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LuLayoutDashboard,
  },
  {
    title: "Form Validations",
    url: "/form-validations",
    icon: GrValidate,
  },
  {
    title: "Topics",
    url: "/topics",
    icon: MdOutlineTopic,
  },
  {
    title: "Licenses",
    url: "/licenses",
    icon: TbLicense,
  },
  {
    title: "Landing page types",
    url: "/landing-page-types",
    icon: MdOutlineTypeSpecimen,
  },
  {
    title: "Languages",
    url: "/languages",
    icon: IoLanguage,
  },
  {
    title: "Features",
    url: "/features",
    icon: MdOutlineFeaturedPlayList,
  },
  {
    title: "Brands",
    url: "/brands",
    icon: SiBrandfolder,
  },
  {
    title: "Designs",
    url: "/designs",
    icon: MdOutlineDesignServices,
  },
  {
    title: "Landing pages",
    url: "/landing-pages",
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
    url: "/form-validations",
    icon: GrValidate,
  },
];

export const menuAdminItems: MenuAdminItem[] = [
  {
    title: "Users",
    url: "/users",
    icon: PiUsersThree,
  },
  {
    title: "User Avatars",
    url: "/user-avatars",
    icon: RxAvatar,
  },
  {
    title: "Flags",
    url: "/flags",
    icon: TbFlag,
  },
  {
    title: "Brand logos",
    url: "/brand-logos",
    icon: AiOutlinePicture,
  },
  {
    title: "Design avatars",
    url: "/design-avatars",
    icon: TbImageInPicture,
  },
];
