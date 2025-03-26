import db from "@/lib/db";

/**
 * {@linkcode getLanguageBySlug}
 *
 * @param {string} id - search in the database by id
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getLanguageByIso = async (iso_639_1: string) => {
  try {
    const language = await db.dl_language.findUnique({
      where: {
        iso_639_1,
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
        },
      },
    });

    return language;
  } catch {
    return null;
  }
};
