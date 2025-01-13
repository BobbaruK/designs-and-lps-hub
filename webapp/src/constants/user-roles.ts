import { UserRole } from "@prisma/client";

export const userRoles = () => {
  const VALUES = [UserRole.ADMIN, UserRole.USER, UserRole.EDITOR] as const;

  return VALUES;
};
