import db from "@/lib/db";

/**
 * {@linkcode getBrands}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getBrands = async () => {
  try {
    const brands = await db.dl_brand.findMany({
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

    return brands;
  } catch {
    return null;
  }
};
