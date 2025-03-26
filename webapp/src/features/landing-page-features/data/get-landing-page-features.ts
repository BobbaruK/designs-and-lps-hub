import db from "@/lib/db";
import { Prisma } from "@prisma/client";

type Include = Prisma.dl_featuresInclude;
type Select = Prisma.dl_featuresSelect;

/**
 * {@linkcode getLandingPageFeatures}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getLandingPageFeatures = async (
  select?: Select | null,
  include?: Include | null,
) => {
  try {
    if (include) {
      const landingPageFeatures = await db.dl_features.findMany({
        orderBy: {
          createdAt: "desc",
        },
        include,
      });

      return landingPageFeatures;
    }

    if (select) {
      const landingPageFeatures = await db.dl_features.findMany({
        orderBy: {
          createdAt: "desc",
        },
        select,
      });

      return landingPageFeatures;
    }

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
