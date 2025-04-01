import db from "@/lib/db";
// import { Prisma } from "@prisma/client";

// type Include = Prisma.dl_featuresInclude;
// type Select = Prisma.dl_featuresSelect;

/**
 * {@linkcode getLandingPageFeatures}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getLandingPageFeatures = async () =>
  // select?: Select | null,
  // include?: Include | null,
  {
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

/**
 * {@linkcode getLandingPageFeaturesMinimal}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getLandingPageFeaturesMinimal = async () => {
  try {
    const landingPageFeatures = await db.dl_features.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        slug: true,
        name: true,
      },
    });

    return landingPageFeatures;
  } catch {
    return null;
  }
};
