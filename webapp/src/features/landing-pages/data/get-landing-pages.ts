import { PAGINATION_DEFAULT } from "@/constants/table";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";

/**
 * {@linkcode getLandingPages}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getLandingPages = async ({
  where,
  perPage,
  pageNumber,
  orderBy,
}: {
  where?: Prisma.dl_landing_pageWhereInput;
  perPage?: number | null;
  pageNumber?: number | null;
  orderBy?: Prisma.dl_landing_pageOrderByWithRelationInput;
}) => {
  const pageSize = perPage || PAGINATION_DEFAULT;
  const skip = pageNumber ? pageNumber * pageSize : 0;

  try {
    const landingPages = await db.dl_landing_page.findMany({
      // orderBy: {
      //   createdAt: "desc",
      // },
      ...(orderBy ? { orderBy } : {}),
      include: {
        createdBy: {
          omit: {
            password: true,
          },
        },
        updatedBy: {
          omit: {
            password: true,
          },
        },
        brand: true,
        design: true,
        registrationType: true,
        language: true,
        license: true,
        landingPageType: true,
        requester: {
          omit: {
            password: true,
          },
        },
        topic: true,
        features: true,
      },
      ...(where ? { where } : {}),
      skip,
      take: pageSize,
    });

    return landingPages;
  } catch {
    return null;
  }
};

/**
 * {@linkcode getLandingPagesFilteredCount}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getLandingPagesFilteredCount = async (
  where?: Prisma.dl_landing_pageWhereInput,
) => {
  try {
    const landingPages = await db.dl_landing_page.count({
      ...(where ? { where } : {}),
    });

    return landingPages;
  } catch {
    return null;
  }
};

/**
 * {@linkcode getLandingPagesCount}
 *
 * @yields a `Promise` that resolve in an number or null
 */
export const getLandingPagesCount = async () => {
  try {
    const landingPagesCount = await db.dl_landing_page.count();

    return landingPagesCount;
  } catch {
    return null;
  }
};

/**
 * {@linkcode getLandingPages}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getLastLandingPages = async (last: number) => {
  try {
    const landingPages = await db.dl_landing_page.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        slug: true,
        name: true,
        url: true,
        createdBy: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        brand: {
          select: {
            id: true,
            logo: true,
            name: true,
            slug: true,
          },
        },
        design: {
          select: {
            id: true,
            slug: true,
            name: true,
            avatar: true,
          },
        },
        language: {
          select: {
            id: true,
            englishName: true,
            iso_639_1: true,
            flag: true,
          },
        },
        license: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
      take: last,
    });

    return landingPages;
  } catch {
    return null;
  }
};

/**
 * {@linkcode getLandingPages}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getLastLPsWaitingForTraffic = async () => {
  try {
    const landingPages = await db.dl_landing_page.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        slug: true,
        name: true,
        url: true,
        isARTS: true,
        isReadyForTraffic: true,
        whatsapp: true,
        createdBy: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        design: {
          select: {
            avatar: true,
          },
        },
      },
      where: {
        isReadyForTraffic: false,
      },
      take: 5,
    });

    return landingPages;
  } catch {
    return null;
  }
};
