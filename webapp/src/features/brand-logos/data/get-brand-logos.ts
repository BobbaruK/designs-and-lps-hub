import { PAGINATION_DEFAULT } from "@/constants/table";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";

/**
 * {@linkcode getBrandLogos}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getBrandLogos = async ({
  where,
  perPage,
  pageNumber,
  orderBy,
}: {
  where?: Prisma.dl_avatar_brand_logoWhereInput;
  perPage?: number;
  pageNumber?: number;
  orderBy?: Prisma.dl_avatar_brand_logoOrderByWithRelationInput;
}) => {
  const pageSize = perPage || PAGINATION_DEFAULT;
  const skip = pageNumber ? pageNumber * pageSize : 0;

  try {
    const brandLogos = await db.dl_avatar_brand_logo.findMany({
      ...(orderBy ? { orderBy } : {}),
      include: {
        createdBy: true,
        updatedBy: true,
      },
      ...(where ? { where } : {}),
      skip,
      take: perPage && Math.sign(perPage) === 1 ? pageSize : undefined,
    });

    return brandLogos;
  } catch {
    return null;
  }
};

/**
 * {@linkcode getBrandLogosCount}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getBrandLogosCount = async (
  where?: Prisma.dl_avatar_brand_logoWhereInput,
) => {
  try {
    const brandLogos = await db.dl_avatar_brand_logo.count({
      ...(where ? { where } : {}),
    });

    return brandLogos;
  } catch {
    return null;
  }
};
