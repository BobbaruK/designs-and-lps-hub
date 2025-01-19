import db from "@/lib/db";

/**
 * {@linkcode getLandingPageTypeBySlug}
 *
 * @param {string} slug - search in the database by id
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getLandingPageTypeBySlug = async (slug: string) => {
  try {
    const landingPageType = await db.dl_landing_page_type.findUnique({
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
        landingPages: {
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
        },
      },
    });

    return landingPageType;
  } catch {
    return null;
  }
};
