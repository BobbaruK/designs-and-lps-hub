import db from "@/lib/db";

/**
 * {@linkcode getFlags}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getFlags = async () => {
  try {
    const flags = await db.dl_avatar_flag.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        createdBy: true,
        updatedBy: true,
      },
    });

    return flags;
  } catch {
    return null;
  }
};
