import db from "@/lib/db";

/**
 * {@linkcode getBrandLogoById}
 *
 * @param {string} id - search in the database by id
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getBrandLogoById = async (id: string) => {
  try {
    const brandLogo = await db.dl_avatar_brand_logo.findUnique({
      where: {
        id,
      },
    });

    return brandLogo;
  } catch {
    return null;
  }
};