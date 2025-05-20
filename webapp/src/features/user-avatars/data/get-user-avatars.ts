import { PAGINATION_DEFAULT } from "@/constants/table";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";

/**
 * {@linkcode getUserAvatars}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getUserAvatars = async ({
  where,
  perPage,
  pageNumber,
  orderBy,
}: {
  where?: Prisma.dl_avatar_userWhereInput;
  perPage?: number;
  pageNumber?: number;
  orderBy?: Prisma.dl_avatar_userOrderByWithRelationInput;
}) => {
  const pageSize = perPage || PAGINATION_DEFAULT;
  const skip = pageNumber ? pageNumber * pageSize : 0;

  try {
    const userAvatars = await db.dl_avatar_user.findMany({
      ...(orderBy ? { orderBy } : {}),
      include: {
        createdBy: true,
        updatedBy: true,
      },
      ...(where ? { where } : {}),
      skip,
      take: perPage && Math.sign(perPage) === 1 ? pageSize : undefined,
    });

    return userAvatars;
  } catch {
    return null;
  }
};

/**
 * {@linkcode getUserAvatarsCount}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getUserAvatarsCount = async (
  where?: Prisma.dl_avatar_userWhereInput,
) => {
  try {
    const userCount = await db.dl_avatar_user.count({
      ...(where ? { where } : {}),
    });

    return userCount;
  } catch {
    return null;
  }
};
