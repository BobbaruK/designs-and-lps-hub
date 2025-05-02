import { PAGINATION_DEFAULT } from "@/constants/table";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";

/**
 * {@linkcode getTopics}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getTopics = async ({
  where,
  perPage,
  pageNumber,
  orderBy,
}: {
  where?: Prisma.dl_topicWhereInput;
  perPage?: number;
  pageNumber?: number;
  orderBy?: Prisma.dl_topicOrderByWithRelationInput;
}) => {
  const pageSize = perPage || PAGINATION_DEFAULT;
  const skip = pageNumber ? pageNumber * pageSize : 0;

  try {
    const topics = await db.dl_topic.findMany({
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

    return topics;
  } catch {
    return null;
  }
};

/**
 * {@linkcode getTopicsCount}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getTopicsCount = async (where?: Prisma.dl_topicWhereInput) => {
  try {
    const brandsCount = await db.dl_topic.count({
      ...(where ? { where } : {}),
    });

    return brandsCount;
  } catch {
    return null;
  }
};

/**
 * {@linkcode getTopicsMinimal}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getTopicsMinimal = async () => {
  try {
    const topics = await db.dl_topic.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        slug: true,
        name: true,
      },
    });

    return topics;
  } catch {
    return null;
  }
};
