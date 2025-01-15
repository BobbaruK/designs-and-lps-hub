"use client";

import { menuAdminItems, menuItems, menuToolsItems } from "@/constants";
import { SidebarWrapper } from "./sidebar-wrapper";

export const AdminSidebarWrapper = () => {
  return (
    <SidebarWrapper
      menuItems={menuItems}
      menuToolsItems={menuToolsItems}
      menuAdminItems={menuAdminItems}
    />
  );
};
