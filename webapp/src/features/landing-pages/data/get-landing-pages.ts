import db from "@/lib/db";
import { Prisma } from "@prisma/client";

type Where = Prisma.dl_landing_pageWhereInput;

/**
 * {@linkcode getLandingPages}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getLandingPages = async () => {
  try {
    const landingPages = await db.dl_landing_page.findMany({
      orderBy: {
        createdAt: "desc",
      },
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
        isReadyForTrafic: true,
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
        isReadyForTrafic: false,
      },
      take: 5,
    });

    return landingPages;
  } catch {
    return null;
  }
};
