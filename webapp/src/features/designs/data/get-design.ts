import db from "@/lib/db";

/**
 * {@linkcode getDesignBySlug}
 *
 * @param {string} slug - search in the database by id
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getDesignBySlug = async (slug: string) => {
  try {
    const design = await db.dl_design.findUnique({
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

    return design;
  } catch {
    return null;
  }
};
