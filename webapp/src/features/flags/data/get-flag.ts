import db from "@/lib/db";

/**
 * {@linkcode getFlagById}
 *
 * @param {string} id - search in the database by id
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getFlagById = async (id: string) => {
  try {
    const flag = await db.dl_avatar_flag.findUnique({
      where: {
        id,
      },
    });

    return flag;
  } catch {
    return null;
  }
};