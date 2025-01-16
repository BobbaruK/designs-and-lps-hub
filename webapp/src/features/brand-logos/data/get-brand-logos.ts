import db from "@/lib/db";

/**
 * {@linkcode getBrandLogos}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getBrandLogos = async () => {
  try {
    const brandLogos = await db.dl_avatar_brand_logo.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        createdBy: true,
        updatedBy: true,
      },
    });

    return brandLogos;
  } catch {
    return null;
  }
};
