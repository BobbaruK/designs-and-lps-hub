import db from "@/lib/db";

/**
 * {@linkcode getTopics}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getTopics = async () => {
  try {
    const topics = await db.dl_topic.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        createdBy: true,
        updatedBy: true,
        _count: {
          select: {
            landingPages: true,
          },
        },
      },
    });

    return topics;
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
