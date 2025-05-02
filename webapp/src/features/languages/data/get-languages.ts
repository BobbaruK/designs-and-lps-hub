import { PAGINATION_DEFAULT } from "@/constants/table";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";

/**
 * {@linkcode getLanguages}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getLanguages = async ({
  where,
  perPage,
  pageNumber,
  orderBy,
}: {
  where?: Prisma.dl_languageWhereInput;
  perPage?: number;
  pageNumber?: number;
  orderBy?: Prisma.dl_languageOrderByWithRelationInput;
}) => {
  const pageSize = perPage || PAGINATION_DEFAULT;
  const skip = pageNumber ? pageNumber * pageSize : 0;

  try {
    const languages = await db.dl_language.findMany({
      ...(orderBy ? { orderBy } : {}),
      include: {
        createdBy: true,
        updatedBy: true,
        _count: {
          select: {
            landingPages: true,
          },
        },
      },
      ...(where ? { where } : {}),
      skip,
      take: perPage || undefined,
    });

    return languages;
  } catch {
    return null;
  }
};

/**
 * {@linkcode getLanguagesCount}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getLanguagesCount = async (
  where?: Prisma.dl_languageWhereInput,
) => {
  try {
    const brandsCount = await db.dl_language.count({
      ...(where ? { where } : {}),
    });

    return brandsCount;
  } catch {
    return null;
  }
};

/**
 * {@linkcode getLanguagesMinimal}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getLanguagesMinimal = async () => {
  try {
    const languages = await db.dl_language.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        iso_639_1: true,
        englishName: true,
      },
    });

    return languages;
  } catch {
    return null;
  }
};

/**
 * {@linkcode getLanguagesWithMostLPs}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getLanguagesWithMostLPs = async () => {
  try {
    const languages = await db.dl_language.findMany({
      include: {
        _count: {
          select: {
            landingPages: true,
          },
        },
      },
      orderBy: {
        landingPages: {
          _count: "desc",
        },
      },
      take: 5,
    });

    return languages;
  } catch {
    return null;
  }
};
