import { PAGINATION_DEFAULT } from "@/constants/table";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";

/**
 * {@linkcode getDesignBySlug}
 *
 * @param {string} slug - search in the database by id
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getDesignBySlug = async ({
  slug,
  lpsWhere,
  orderBy,
  pageNumber,
  perPage,
}: {
  slug: string;
  lpsWhere?: Prisma.dl_landing_pageWhereInput;
  orderBy?: Prisma.dl_landing_pageOrderByWithRelationInput;
  perPage?: number | null;
  pageNumber?: number | null;
}) => {
  const pageSize = perPage || PAGINATION_DEFAULT;
  const skip = pageNumber ? pageNumber * pageSize : 0;

  try {
    const design = await db.dl_design.findUnique({
      where: {
        slug,
      },
      include: {
        createdBy: {
          omit: {
            password: true,
          },
        },
        updatedBy: {
          omit: {
            password: true,
          },
        },
        landingPages: {
          include: {
            createdBy: {
              omit: {
                password: true,
              },
            },
            updatedBy: {
              omit: {
                password: true,
              },
            },
            brand: true,
            design: true,
            registrationType: true,
            language: true,
            license: true,
            landingPageType: true,
            requester: {
              omit: {
                password: true,
              },
            },
            topic: true,
            features: true,
          },
          skip,
          take: pageSize,
          ...(orderBy ? { orderBy } : {}),
          ...(lpsWhere ? { where: lpsWhere } : {}),
        },
      },
    });

    return design;
  } catch {
    return null;
  }
};

/**
 * {@linkcode getDesignBySlugLPsCount}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getDesignBySlugLPsCount = async (
  where?: Prisma.dl_landing_pageWhereInput,
) => {
  try {
    const landingPages = await db.dl_landing_page.count({
      ...(where ? { where } : {}),
    });

    return landingPages;
  } catch {
    return null;
  }
};
