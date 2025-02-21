import db from "@/lib/db";

/**
 * {@linkcode getLandingPageFeatures}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getLandingPageFeatures = async () => {
  try {
    const landingPageFeatures = await db.dl_features.findMany({
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

    return landingPageFeatures;
  } catch {
    return null;
  }
};
