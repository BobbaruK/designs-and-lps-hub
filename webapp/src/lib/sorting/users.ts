import { Prisma } from "@prisma/client";

export const usersOrderBy = ({
  sortBy,
  sort,
}: {
  sortBy: string;
  sort: "asc" | "desc" | null;
}): Prisma.UserOrderByWithRelationInput => {
  if (
    sortBy === "name" ||
    sortBy === "email" ||
    sortBy === "emailVerified" ||
    sortBy === "role" ||
    sortBy === "createdAt" ||
    sortBy === "updatedAt"
  ) {
    return {
      [sortBy]: sort || "desc",
    };
  }

  if (sortBy === "2fa") {
    return {
      isTwoFactorEnabled: sort || "desc",
    };
  }

  return {
    ["createdAt"]: sort || "desc",
  };
};
