import db from "@/lib/db";

/**
 * {@linkcode getRegistrationTypeBySlug}
 *
 * @param {string} slug - search in the database by id
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getRegistrationTypeBySlug = async (slug: string) => {
  try {
    const registrationType = await db.dl_registration_type.findUnique({
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
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return registrationType;
  } catch {
    return null;
  }
};
