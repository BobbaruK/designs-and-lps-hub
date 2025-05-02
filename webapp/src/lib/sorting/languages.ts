import { Prisma } from "@prisma/client";

export const languagesOrderBy = ({
  sortBy,
  sort,
}: {
  sortBy: string;
  sort: "asc" | "desc" | null;
}): Prisma.dl_languageOrderByWithRelationInput => {
  if (
    sortBy === "englishName" ||
    sortBy === "createdAt" ||
    sortBy === "updatedAt" ||
    sortBy === "iso_639_1" ||
    sortBy === "iso_3166_1"
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
