import db from "@/lib/db";

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
        formValidation: true,
        language: true,
        license: true,
        lpType: true,
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
    const landingPageType = await db.dl_landing_page.findUnique({
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
        design: true,
        formValidation: true,
        language: true,
        license: true,
        lpType: true,
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
