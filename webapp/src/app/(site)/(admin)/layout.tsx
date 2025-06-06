import { DEFAULT_LOGIN_REDIRECT } from "@/constants/routes";
import { currentRole } from "@/features/auth/lib/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const AdminLayout = async ({ children }: Props) => {
  const role = await currentRole();

  if (role !== "ADMIN") redirect(DEFAULT_LOGIN_REDIRECT);

  return children;
};

export default AdminLayout;
