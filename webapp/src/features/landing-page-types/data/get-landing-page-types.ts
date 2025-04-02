import db from "@/lib/db";

/**
 * {@linkcode getLandingPageTypes}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getLandingPageTypes = async () => {
  try {
    const landingPageTypes = await db.dl_landing_page_type.findMany({
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

    return landingPageTypes;
  } catch {
    return null;
  }
};

/**
 * {@linkcode getLandingPageTypesMinimal}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getLandingPageTypesMinimal = async () => {
  try {
    const landingPageTypes = await db.dl_landing_page_type.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        slug: true,
        name: true,
      },
    });

    return landingPageTypes;
  } catch {
    return null;
  }
};
