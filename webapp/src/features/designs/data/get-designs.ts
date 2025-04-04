import db from "@/lib/db";

/**
 * {@linkcode getDesigns}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getDesigns = async () => {
  try {
    const designs = await db.dl_design.findMany({
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
export const getDesignsCount = async () => {
  try {
    const designsCount = await db.dl_design.count();

    return designsCount;
  } catch {
    return null;
  }
};
