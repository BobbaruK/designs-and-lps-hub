import db from "@/lib/db";

/**
 * {@linkcode getUserAvatarById}
 *
 * @param {string} id - search in the database by id
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getUserAvatarById = async (id: string) => {
  try {
    const userAvatar = await db.dl_avatar_user.findUnique({
      where: {
        id,
      },
    });

    return userAvatar;
  } catch {
    return null;
  }
};