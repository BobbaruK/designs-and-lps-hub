import db from "@/lib/db";

/**
 * {@linkcode getLicenses}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getLicenses = async () => {
  try {
    const licenses = await db.dl_license.findMany({
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

    return licenses;
  } catch {
    return null;
  }
};

/**
 * {@linkcode getLicensesMinimal}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getLicensesMinimal = async () => {
  try {
    const licenses = await db.dl_license.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        slug: true,
        name: true,
      },
    });

    return licenses;
  } catch {
    return null;
  }
};
