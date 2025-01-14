"use client";

import { menuAdminItems, menuItems, menuToolsItems } from "@/constants";
import { ClientSidebar } from "./sidebar-wrapper";

export const AdminSidebarWrapper = () => {
  return (
    <ClientSidebar
      menuItems={menuItems}
      menuToolsItems={menuToolsItems}
      menuAdminItems={menuAdminItems}
    />
  );
};
