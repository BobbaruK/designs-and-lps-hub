import db from "@/lib/db";

/**
 * {@linkcode getBrandLogos}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getDesignAvatars = async () => {
  try {
    const designAvatar = await db.dl_avatar_design.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        createdBy: true,
        updatedBy: true,
      },
    });

    return designAvatar;
  } catch {
    return null;
  }
};
