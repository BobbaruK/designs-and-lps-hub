import { Prisma } from "@prisma/client";

export const featuresOrderBy = ({
  sortBy,
  sort,
}: {
  sortBy: string;
  sort: "asc" | "desc" | null;
}): Prisma.dl_featuresOrderByWithRelationInput => {
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
