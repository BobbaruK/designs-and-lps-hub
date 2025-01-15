import db from "@/lib/db";

/**
 * {@linkcode getUserAvatars}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getUserAvatars = async () => {
  try {
    const userAvatars = await db.dl_avatar_user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        createdBy: true,
        updatedBy: true,
      },
    });

    return userAvatars;
  } catch {
    return null;
  }
};
