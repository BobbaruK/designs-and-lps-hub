import db from "@/lib/db";

/**
 * {@linkcode getBrandResources}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getBrandResources = async () => {
  try {
    const brandResources = await db.dl_brand_resource.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        createdBy: true,
        updatedBy: true,
        brand: {
          select: {
            id: true,
            name: true,
            slug: true,
            logo: true,
          },
        },
      },
    });

    return brandResources;
  } catch {
    return null;
  }
};
