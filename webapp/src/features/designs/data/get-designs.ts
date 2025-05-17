import { PAGINATION_DEFAULT } from "@/constants/table";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";

/**
 * {@linkcode getDesigns}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getDesigns = async ({
  where,
  perPage,
  pageNumber,
  orderBy,
}: {
  where?: Prisma.dl_designWhereInput;
  perPage?: number | null;
  pageNumber?: number | null;
  orderBy?: Prisma.dl_designOrderByWithRelationInput;
}) => {
  const pageSize = perPage || PAGINATION_DEFAULT;
  const skip = pageNumber ? pageNumber * pageSize : 0;

  const include: Prisma.dl_designInclude = {
    createdBy: true,
    updatedBy: true,
    avatars: true,
    _count: {
      select: {
        landingPages: true,
      },
    },
  };

  try {
    const designs = await db.dl_design.findMany({
      include,
      ...(orderBy ? { orderBy } : {}),
      ...(where ? { where } : {}),
      skip,
      take: perPage && Math.sign(perPage) === 1 ? pageSize : undefined,
    });

    return designs;
  } catch {
    return null;
  }
};

/**
 * {@linkcode getDesignsCount}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getDesignsCount = async (where?: Prisma.dl_designWhereInput) => {
  try {
    const designsCount = await db.dl_design.count({
      ...(where ? { where } : {}),
    });

    return designsCount;
  } catch {
    return null;
  }
};
