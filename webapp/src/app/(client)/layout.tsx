import { ClientSidebarWrapper } from "@/components/client-sidebar-wrapper";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const ClientLayout = ({ children }: Props) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <ClientSidebarWrapper />
      <main className="w-full">{children}</main>
    </SidebarProvider>
  );
};

export default ClientLayout;
