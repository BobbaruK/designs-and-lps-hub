import { Prisma } from "@prisma/client";

export const lpsOrderBy = ({
  sortBy,
  sort,
}: {
  sortBy: string;
  sort: "asc" | "desc" | null;
}): Prisma.dl_landing_pageOrderByWithRelationInput => {
  if (
    sortBy === "name" ||
    sortBy === "slug" ||
    sortBy === "url" ||
    sortBy === "createdAt" ||
    sortBy === "updatedAt"
  ) {
    return {
      [sortBy]: sort || "desc",
    };
  }

  if (
    sortBy === "requester" ||
    sortBy === "topic" ||
    sortBy === "license" ||
    sortBy === "landingPageType" ||
    sortBy === "registrationType" ||
    sortBy === "brand" ||
    sortBy === "createdBy" ||
    sortBy === "updatedBy"
  ) {
    return {
      [sortBy]: {
        slug: sort || "desc",
      },
    };
  }

  if (sortBy === "language") {
    return {
      [sortBy]: {
        englishName: sort || "desc",
      },
    };
  }

  return {
    [sortBy || "createdAt"]: sort || "desc",
  };
};

export const designsOrderBy = ({
  sortBy,
  sort,
}: {
  sortBy: string;
  sort: "asc" | "desc" | null;
}): Prisma.dl_designOrderByWithRelationInput => {
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
