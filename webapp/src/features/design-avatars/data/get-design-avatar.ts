import db from "@/lib/db";

/**
 * {@linkcode getDesignAvatarById}
 *
 * @param {string} id - search in the database by id
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getDesignAvatarById = async (id: string) => {
  try {
    const designAvatar = await db.dl_avatar_design.findUnique({
      where: {
        id,
      },
    });

    return designAvatar;
  } catch {
    return null;
  }
};