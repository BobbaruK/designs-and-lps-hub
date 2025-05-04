import { PAGINATION_DEFAULT } from "@/constants/table";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";

/**
 * {@linkcode getLandingPages}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getLandingPages = async ({
  where,
  perPage,
  pageNumber,
  orderBy,
}: {
  where?: Prisma.dl_landing_pageWhereInput;
  perPage?: number | null;
  pageNumber?: number | null;
  orderBy?: Prisma.dl_landing_pageOrderByWithRelationInput;
}) => {
  const pageSize = perPage || PAGINATION_DEFAULT;
  const skip = pageNumber ? pageNumber * pageSize : 0;

  const include: Prisma.dl_landing_pageInclude = {
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
  };

  try {
    const landingPages = await db.dl_landing_page.findMany({
      include,
      ...(orderBy ? { orderBy } : {}),
      ...(where ? { where } : {}),
      skip,
      take: pageSize,
    });

    return landingPages;
  } catch {
    return null;
  }
};

/**
 * {@linkcode getLandingPagesFilteredCount}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getLandingPagesFilteredCount = async (
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
