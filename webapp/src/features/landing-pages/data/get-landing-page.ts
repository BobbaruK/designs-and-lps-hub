import db from "@/lib/db";
import { Prisma } from "@prisma/client";

/**
 * {@linkcode getLandingPageById}
 *
 * @param {string} id - search in the database by id
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getLandingPageById = async (id: string) => {
  try {
    const landingPageType = await db.dl_landing_page.findUnique({
      where: {
        id,
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
      },
    });

    return landingPageType;
  } catch {
    return null;
  }
};

/**
 * {@linkcode getLandingPageBySlug}
 *
 * @param {string} slug - search in the database by id
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getLandingPageBySlug = async (slug: string) => {
  try {
    const landingPage = await db.dl_landing_page.findUnique({
      where: {
        slug,
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
        avatar: true,
        design: { include: { avatars: true } },
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

    return landingPage;
  } catch {
    return null;
  }
};

/**
 * {@linkcode getLandingPage}
 *
 * @param {string} slug - search in the database by id
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getLandingPage = async ({
  where,
}: {
  where: Prisma.dl_landing_pageWhereInput;
}) => {
  try {
    const landingPage = await db.dl_landing_page.findFirst({
      where,
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
        avatar: true,
        design: { include: { avatars: true } },
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

    return landingPage;
  } catch {
    return null;
  }
};
