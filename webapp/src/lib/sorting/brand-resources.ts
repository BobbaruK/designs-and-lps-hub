import { Prisma } from "@prisma/client";

export const brandResourcesOrderBy = ({
  sortBy,
  sort,
}: {
  sortBy: string;
  sort: "asc" | "desc" | null;
}): Prisma.dl_brand_resourceOrderByWithRelationInput => {
  if (sortBy === "name" || sortBy === "createdAt" || sortBy === "updatedAt") {
    return {
      [sortBy]: sort || "desc",
    };
  }

  if (sortBy === "brand") {
    return {
      brand: {
        name: sort || "desc",
      },
    };
  }

  return {
    ["createdAt"]: sort || "desc",
  };
};
