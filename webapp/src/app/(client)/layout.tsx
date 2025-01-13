import { ClientSidebar } from "@/components/client-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const SiteLayout = ({ children }: Props) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <ClientSidebar />
      <main className="w-full">{children}</main>
    </SidebarProvider>
  );
};

export default SiteLayout;
