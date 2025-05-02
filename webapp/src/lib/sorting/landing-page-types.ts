import { Prisma } from "@prisma/client";

export const landingPageTypesWhereOrderBy = ({
  sortBy,
  sort,
}: {
  sortBy: string;
  sort: "asc" | "desc" | null;
}): Prisma.dl_landing_page_typeOrderByWithRelationInput => {
  if (
    sortBy === "name" ||
    sortBy === "slug" ||
    sortBy === "createdAt" ||
    sortBy === "updatedAt"
  ) {
    return {
      [sortBy]: sort || "desc",
    };
  }

  if (sortBy === "lpsCount") {
    return {
      landingPages: {
        _count: sort || "desc",
      },
    };
  }

  return {
    [sortBy || "createdAt"]: sort || "desc",
  };
};
