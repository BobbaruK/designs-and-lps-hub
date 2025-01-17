"use client";

import { menuAdminItems, menuItems, menuToolsItems } from "@/constants/menu";
import { SidebarWrapper } from "./sidebar-wrapper";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";

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
