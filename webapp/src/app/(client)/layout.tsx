import { ClientSidebarWrapper } from "@/components/client-sidebar-wrapper";
import { MainWrapper } from "@/components/main-wrapper";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const ClientLayout = ({ children }: Props) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <ClientSidebarWrapper />
      <MainWrapper>{children}</MainWrapper>
    </SidebarProvider>
  );
};

export default ClientLayout;
