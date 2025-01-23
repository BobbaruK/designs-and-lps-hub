import { currentRole } from "@/features/auth/lib/auth";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";

export const redirectUser = async (redirectTo: string) => {
  const role = await currentRole();
  if (role === UserRole.USER) redirect(redirectTo);
};
