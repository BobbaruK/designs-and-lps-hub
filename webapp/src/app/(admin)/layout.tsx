import { MainWrapper } from "@/components/main-wrapper";
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

  return <MainWrapper>{children}</MainWrapper>;
};

export default AdminLayout;
