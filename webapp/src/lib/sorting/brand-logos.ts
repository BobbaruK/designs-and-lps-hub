import { Prisma } from "@prisma/client";

export const brandLogosOrderBy = ({
  sortBy,
  sort,
}: {
  sortBy: string;
  sort: "asc" | "desc" | null;
}): Prisma.UserOrderByWithRelationInput => {
  if (sortBy === "name" || sortBy === "createdAt" || sortBy === "updatedAt") {
    return {
      [sortBy]: sort || "desc",
    };
  }

  return {
    ["createdAt"]: sort || "desc",
  };
};
