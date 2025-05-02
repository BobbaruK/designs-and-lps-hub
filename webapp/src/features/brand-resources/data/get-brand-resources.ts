import { PAGINATION_DEFAULT } from "@/constants/table";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";

/**
 * {@linkcode getBrandResources}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getBrandResources = async ({
  where,
  perPage,
  pageNumber,
  orderBy,
}: {
  where?: Prisma.dl_brand_resourceWhereInput;
  perPage?: number;
  pageNumber?: number;
  orderBy?: Prisma.dl_brand_resourceOrderByWithRelationInput;
}) => {
  const pageSize = perPage || PAGINATION_DEFAULT;
  const skip = pageNumber ? pageNumber * pageSize : 0;

  try {
    const brandResources = await db.dl_brand_resource.findMany({
      ...(orderBy ? { orderBy } : {}),
      include: {
        createdBy: true,
        updatedBy: true,
        brand: {
          select: {
            id: true,
            name: true,
            slug: true,
            logo: true,
          },
        },
      },
      ...(where ? { where } : {}),
      skip,
      take: perPage || undefined,
    });

    return brandResources;
  } catch {
    return null;
  }
};

/**
 * {@linkcode getBrandResourcesCount}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getBrandResourcesCount = async (
  where?: Prisma.dl_brand_resourceWhereInput,
) => {
  try {
    const brandsCount = await db.dl_brand_resource.count({
      ...(where ? { where } : {}),
    });

    return brandsCount;
  } catch {
    return null;
  }
};
