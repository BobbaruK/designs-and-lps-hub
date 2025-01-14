import { AdminSidebarWrapper } from "@/components/admin-sidebar-wrapper";
import { MainWrapper } from "@/components/main-wrapper";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DEFAULT_LOGIN_REDIRECT } from "@/constants";
import { currentRole } from "@/features/auth/lib/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const AdminLayout = async ({ children }: Props) => {
  const role = await currentRole();

  if (role !== "ADMIN") redirect(DEFAULT_LOGIN_REDIRECT);

  return (
    <SidebarProvider defaultOpen={true}>
      <AdminSidebarWrapper />
      <MainWrapper>{children}</MainWrapper>
    </SidebarProvider>
  );
};

export default AdminLayout;
