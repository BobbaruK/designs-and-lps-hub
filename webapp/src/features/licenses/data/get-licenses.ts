import { PAGINATION_DEFAULT } from "@/constants/table";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";

/**
 * {@linkcode getLicenses}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getLicenses = async ({
  where,
  perPage,
  pageNumber,
  orderBy,
}: {
  where?: Prisma.dl_licenseWhereInput;
  perPage?: number;
  pageNumber?: number;
  orderBy?: Prisma.dl_licenseOrderByWithRelationInput;
}) => {
  const pageSize = perPage || PAGINATION_DEFAULT;
  const skip = pageNumber ? pageNumber * pageSize : 0;

  try {
    const licenses = await db.dl_license.findMany({
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

    return licenses;
  } catch {
    return null;
  }
};

/**
 * {@linkcode getLicensesCount}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getLicensesCount = async (where?: Prisma.dl_licenseWhereInput) => {
  try {
    const brandsCount = await db.dl_license.count({
      ...(where ? { where } : {}),
    });

    return brandsCount;
  } catch {
    return null;
  }
};

/**
 * {@linkcode getLicensesMinimal}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getLicensesMinimal = async () => {
  try {
    const licenses = await db.dl_license.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        slug: true,
        name: true,
      },
    });

    return licenses;
  } catch {
    return null;
  }
};
