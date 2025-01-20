import db from "@/lib/db";

/**
 * {@linkcode getLanguages}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getLanguages = async () => {
  try {
    const languages = await db.dl_language.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        createdBy: true,
        updatedBy: true,
        _count: {
          select: {
            landingPages: true,
          },
        },
      },
    });

    return languages;
  } catch {
    return null;
  }
};
