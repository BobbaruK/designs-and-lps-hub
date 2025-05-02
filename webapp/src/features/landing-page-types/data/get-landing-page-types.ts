import { PAGINATION_DEFAULT } from "@/constants/table";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";

/**
 * {@linkcode getLandingPageTypes}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getLandingPageTypes = async ({
  where,
  perPage,
  pageNumber,
  orderBy,
}: {
  where?: Prisma.dl_landing_page_typeWhereInput;
  perPage?: number;
  pageNumber?: number;
  orderBy?: Prisma.dl_landing_page_typeOrderByWithRelationInput;
}) => {
  const pageSize = perPage || PAGINATION_DEFAULT;
  const skip = pageNumber ? pageNumber * pageSize : 0;

  try {
    const landingPageTypes = await db.dl_landing_page_type.findMany({
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
      take: perPage || undefined,
    });

    return landingPageTypes;
  } catch {
    return null;
  }
};

/**
 * {@linkcode getLandingPageTypesCount}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getLandingPageTypesCount = async (
  where?: Prisma.dl_landing_page_typeWhereInput,
) => {
  try {
    const landingPageTypesCount = await db.dl_landing_page_type.count({
      ...(where ? { where } : {}),
    });

    return landingPageTypesCount;
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
