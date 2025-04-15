import { MenuAdminItem, MenuItem, MenuToolsItem } from "@/types/menu-items";
import { AiOutlinePicture } from "react-icons/ai";
import { GrResources, GrValidate } from "react-icons/gr";
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
import { brandResourcesMeta } from "./page-titles/brand-resources";
import { brandsMeta } from "./page-titles/brands";
import { designsMeta } from "./page-titles/designs";
import { featuresTypeMeta } from "./page-titles/features";
import { landingPageTypeMeta } from "./page-titles/landing-page-type";
import { landingPagesMeta } from "./page-titles/landing-pages";
import { languagesMeta } from "./page-titles/languages";
import { licensesMeta } from "./page-titles/licenses";
import { registrationTypesMeta } from "./page-titles/registration-types";
import { topicsMeta } from "./page-titles/topics";

export const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LuLayoutDashboard,
  },
  {
    title: landingPagesMeta.label.plural,
    url: landingPagesMeta.href,
    icon: VscFileSymlinkDirectory,
  },
  {
    title: designsMeta.label.plural,
    url: designsMeta.href,
    icon: MdOutlineDesignServices,
  },
  {
    title: featuresTypeMeta.label.plural,
    url: featuresTypeMeta.href,
    icon: MdOutlineFeaturedPlayList,
  },
  {
    title: brandsMeta.label.plural,
    url: brandsMeta.href,
    icon: SiBrandfolder,
  },
  {
    title: registrationTypesMeta.label.plural,
    url: registrationTypesMeta.href,
    icon: GrValidate,
  },
  {
    title: languagesMeta.label.plural,
    url: languagesMeta.href,
    icon: IoLanguage,
  },
  {
    title: topicsMeta.label.plural,
    url: topicsMeta.href,
    icon: MdOutlineTopic,
  },
  {
    title: licensesMeta.label.plural,
    url: licensesMeta.href,
    icon: TbLicense,
  },
  {
    title: landingPageTypeMeta.label.plural,
    url: landingPageTypeMeta.href,
    icon: MdOutlineTypeSpecimen,
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
    title: brandResourcesMeta.label.plural,
    url: brandResourcesMeta.href,
    icon: GrResources,
  },
  {
    title: "Design avatars",
    url: "/design-avatars",
    icon: TbImageInPicture,
  },
];
