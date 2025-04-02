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

/**
 * {@linkcode getLanguagesMinimal}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getLanguagesMinimal = async () => {
  try {
    const languages = await db.dl_language.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        iso_639_1: true,
        englishName: true,
      },
    });

    return languages;
  } catch {
    return null;
  }
};

/**
 * {@linkcode getLanguagesWithMostLPs}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getLanguagesWithMostLPs = async () => {
  try {
    const languages = await db.dl_language.findMany({
      include: {
        _count: {
          select: {
            landingPages: true,
          },
        },
      },
      orderBy: {
        landingPages: {
          _count: "desc",
        },
      },
      take: 5,
    });

    return languages;
  } catch {
    return null;
  }
};
