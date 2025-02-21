import db from "@/lib/db";

/**
 * {@linkcode getBrandBySlug}
 *
 * @param {string} slug - search in the database by id
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getBrandBySlug = async (slug: string) => {
  try {
    const license = await db.dl_brand.findUnique({
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
            landingPageType: true,
            requester: {
              omit: {
                password: true,
              },
            },
            topic: true,
            features: true,
          },
        },
      },
    });

    return license;
  } catch {
    return null;
  }
};
