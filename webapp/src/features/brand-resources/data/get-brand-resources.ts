import db from "@/lib/db";
import { Prisma } from "@prisma/client";

/**
 * {@linkcode getBrandResources}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getBrandResources = async (
  where?: Prisma.dl_brand_resourceWhereInput,
) => {
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
      ...(where ? { where } : {}),
    });

    return brandResources;
  } catch {
    return null;
  }
};
