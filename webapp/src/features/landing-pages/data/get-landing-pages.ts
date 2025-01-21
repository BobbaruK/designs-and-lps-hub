import db from "@/lib/db";

/**
 * {@linkcode getLandingPages}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getLandingPages = async () => {
  try {
    const designs = await db.dl_landing_page.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        createdBy: true,
        updatedBy: true,
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

    return designs;
  } catch {
    return null;
  }
};
