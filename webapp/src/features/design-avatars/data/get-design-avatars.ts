import { PAGINATION_DEFAULT } from "@/constants/table";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";

/**
 * {@linkcode getDesignAvatars}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getDesignAvatars = async ({
  where,
  perPage,
  pageNumber,
  orderBy,
}: {
  where?: Prisma.dl_avatar_designWhereInput;
  perPage?: number;
  pageNumber?: number;
  orderBy?: Prisma.dl_avatar_designOrderByWithRelationInput;
}) => {
  const pageSize = perPage || PAGINATION_DEFAULT;
  const skip = pageNumber ? pageNumber * pageSize : 0;

  try {
    const designAvatar = await db.dl_avatar_design.findMany({
      ...(orderBy ? { orderBy } : {}),
      include: {
        createdBy: true,
        updatedBy: true,
      },
      ...(where ? { where } : {}),
      skip,
      take: perPage && Math.sign(perPage) === 1 ? pageSize : undefined,
    });

    return designAvatar;
  } catch {
    return null;
  }
};

/**
 * {@linkcode getDesignAvatarsCount}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getDesignAvatarsCount = async (
  where?: Prisma.dl_avatar_designWhereInput,
) => {
  try {
    const avatarDesigns = await db.dl_avatar_design.count({
      ...(where ? { where } : {}),
    });

    return avatarDesigns;
  } catch {
    return null;
  }
};
