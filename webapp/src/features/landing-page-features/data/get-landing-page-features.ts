import { PAGINATION_DEFAULT } from "@/constants/table";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";

/**
 * {@linkcode getLandingPageFeatures}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getLandingPageFeatures = async ({
  where,
  perPage,
  pageNumber,
  orderBy,
}: {
  where?: Prisma.dl_featuresWhereInput;
  perPage?: number;
  pageNumber?: number;
  orderBy?: Prisma.dl_featuresOrderByWithRelationInput;
}) => {
  const pageSize = perPage || PAGINATION_DEFAULT;
  const skip = pageNumber ? pageNumber * pageSize : 0;

  try {
    const landingPageFeatures = await db.dl_features.findMany({
      ...(orderBy ? { orderBy } : {}),
      include: {
        createdBy: true,
        updatedBy: true,
        _count: {
          select: {
            landingPages: true,
          },
        },
      },
      ...(where ? { where } : {}),
      skip,
      take: perPage && Math.sign(perPage) === 1 ? pageSize : undefined,
    });

    return landingPageFeatures;
  } catch {
    return null;
  }
};

/**
 * {@linkcode getLandingPageFeaturesCount}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getLandingPageFeaturesCount = async (
  where?: Prisma.dl_featuresWhereInput,
) => {
  try {
    const featuresCount = await db.dl_features.count({
      ...(where ? { where } : {}),
    });

    return featuresCount;
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
