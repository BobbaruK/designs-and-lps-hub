import { PAGINATION_DEFAULT } from "@/constants/table";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";

/**
 * {@linkcode getBrands}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getBrands = async ({
  where,
  perPage,
  pageNumber,
  orderBy,
}: {
  where?: Prisma.dl_brandWhereInput;
  perPage?: number;
  pageNumber?: number;
  orderBy?: Prisma.dl_brandOrderByWithRelationInput;
}) => {
  const pageSize = perPage || PAGINATION_DEFAULT;
  const skip = pageNumber ? pageNumber * pageSize : 0;

  try {
    const brands = await db.dl_brand.findMany({
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

    return brands;
  } catch {
    return null;
  }
};

/**
 * {@linkcode getBrandsCount}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getBrandsCount = async (where?: Prisma.dl_brandWhereInput) => {
  try {
    const brandsCount = await db.dl_brand.count({
      ...(where ? { where } : {}),
    });

    return brandsCount;
  } catch {
    return null;
  }
};

/**
 * {@linkcode getBrandsMinimal}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getBrandsMinimal = async () => {
  try {
    const brands = await db.dl_brand.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        slug: true,
        name: true,
      },
    });

    return brands;
  } catch {
    return null;
  }
};
