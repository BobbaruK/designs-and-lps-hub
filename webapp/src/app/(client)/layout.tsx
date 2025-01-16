import { MainWrapper } from "@/components/main-wrapper";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const ClientLayout = ({ children }: Props) => {
  return <MainWrapper>{children}</MainWrapper>;
};

export default ClientLayout;
