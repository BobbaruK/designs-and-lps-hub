import db from "@/lib/db";

/**
 * {@linkcode getBrandResourceById}
 *
 * @param {string} id - search in the database by id
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getBrandResourceById = async (id: string) => {
  try {
    const brandLogo = await db.dl_brand_resource.findUnique({
      where: {
        id,
      },
      include: {
        brand: true,
      },
    });

    return brandLogo;
  } catch {
    return null;
  }
};
