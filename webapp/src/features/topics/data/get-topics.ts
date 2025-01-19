import db from "@/lib/db";

/**
 * {@linkcode getTopics}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getTopics = async () => {
  try {
    const formValidations = await db.dl_topic.findMany({
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

    return formValidations;
  } catch {
    return null;
  }
};
