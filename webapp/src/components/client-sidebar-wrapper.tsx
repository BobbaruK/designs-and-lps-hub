"use client";

import { menuAdminItems, menuItems, menuToolsItems } from "@/constants";
import { SidebarWrapper } from "./sidebar-wrapper";
import { useCurrentUser } from "@/features/auth/hooks";

export const ClientSidebarWrapper = () => {
  const user = useCurrentUser();

  const menuAdmin = user?.role === "ADMIN" ? menuAdminItems : undefined;

  return (
    <>
      <SidebarWrapper
        menuItems={menuItems}
        menuToolsItems={menuToolsItems}
        menuAdminItems={menuAdmin}
      />
    </>
  );
};
