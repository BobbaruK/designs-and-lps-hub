import { PAGINATION_DEFAULT } from "@/constants/table";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";

/**
 * {@linkcode getLanguageBySlug}
 *
 * @param {string} id - search in the database by id
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getLanguageBySlug = async ({
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
    const language = await db.dl_language.findUnique({
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
            design: { include: { avatars: true } },
            avatar: true,
            brand: true,
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

    return language;
  } catch {
    return null;
  }
};
