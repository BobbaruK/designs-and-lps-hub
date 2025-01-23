"use client";

import { menuAdminItems, menuItems, menuToolsItems } from "@/constants/menu";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { UserRole } from "@prisma/client";
import { SidebarWrapper } from "./sidebar-wrapper";

export const ClientSidebarWrapper = () => {
  const user = useCurrentUser();

  const menuAdmin = user?.role === UserRole.ADMIN ? menuAdminItems : undefined;

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
