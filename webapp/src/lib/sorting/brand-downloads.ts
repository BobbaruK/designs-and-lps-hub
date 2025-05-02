import { Prisma } from "@prisma/client";

export const brandDownloadsOrderBy = ({
  sortBy,
  sort,
}: {
  sortBy: string;
  sort: "asc" | "desc" | null;
  // }): Prisma.dl_registration_typeOrderByWithRelationInput => {
}): Prisma.dl_brand_resourceOrderByWithRelationInput => {
  if (
    sortBy === "name" ||
    sortBy === "type" ||
    sortBy === "createdAt" ||
    sortBy === "updatedAt"
  ) {
    return {
      [sortBy]: sort || "desc",
    };
  }

  return {
    [sortBy || "createdAt"]: sort || "desc",
  };
};
