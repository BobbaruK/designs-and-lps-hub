import { PAGINATION_DEFAULT } from "@/constants/table";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";

/**
 * {@linkcode getFlags}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getFlags = async ({
  where,
  perPage,
  pageNumber,
  orderBy,
}: {
  where?: Prisma.dl_avatar_flagWhereInput;
  perPage?: number;
  pageNumber?: number;
  orderBy?: Prisma.dl_avatar_flagOrderByWithRelationInput;
}) => {
  const pageSize = perPage || PAGINATION_DEFAULT;
  const skip = pageNumber ? pageNumber * pageSize : 0;

  try {
    const flags = await db.dl_avatar_flag.findMany({
      ...(orderBy ? { orderBy } : {}),
      include: {
        createdBy: true,
        updatedBy: true,
      },
      ...(where ? { where } : {}),
      skip,
      take: perPage && Math.sign(perPage) === 1 ? pageSize : undefined,
    });

    return flags;
  } catch {
    return null;
  }
};

/**
 * {@linkcode getFlagsCount}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getFlagsCount = async (
  where?: Prisma.dl_avatar_flagWhereInput,
) => {
  try {
    const userCount = await db.dl_avatar_flag.count({
      ...(where ? { where } : {}),
    });

    return userCount;
  } catch {
    return null;
  }
};
