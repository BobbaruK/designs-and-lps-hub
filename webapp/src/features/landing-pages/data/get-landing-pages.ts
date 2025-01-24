import db from "@/lib/db";

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
        formValidation: true,
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
