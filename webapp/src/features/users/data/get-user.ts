import { PAGINATION_DEFAULT } from "@/constants/table";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";

/**
 * {@linkcode getUsers}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getUsers = async ({
  where,
  perPage,
  pageNumber,
  orderBy,
}: {
  where?: Prisma.UserWhereInput;
  perPage?: number;
  pageNumber?: number;
  orderBy?: Prisma.UserOrderByWithRelationInput;
}) => {
  const pageSize = perPage || PAGINATION_DEFAULT;
  const skip = pageNumber ? pageNumber * pageSize : 0;

  try {
    const user = await db.user.findMany({
      omit: {
        password: true,
      },
      ...(orderBy ? { orderBy } : {}),
      include: {
        accounts: {
          omit: {
            refresh_token: true,
            access_token: true,
            token_type: true,
            id_token: true,
            session_state: true,
            providerAccountId: true,
            expires_at: true,
            scope: true,
          },
        },
        registrationTypeCreated: false,
        registrationTypeUpdated: false,
      },
      ...(where ? { where } : {}),
      skip,
      take: perPage && Math.sign(perPage) === 1 ? pageSize : undefined,
    });

    return user;
  } catch {
    return null;
  }
};

/**
 * {@linkcode getUserByEmail}
 *
 * @param {string} email - search in the database by email
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      omit: {
        password: true,
      },
    });

    return user;
  } catch {
    return null;
  }
};

/**
 * {@linkcode getUserCount}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getUserCount = async (where?: Prisma.UserWhereInput) => {
  try {
    const userCount = await db.user.count({
      ...(where ? { where } : {}),
    });

    return userCount;
  } catch {
    return null;
  }
};

/**
 * {@linkcode getUserById}
 *
 * @param {string} id - search in the database by id
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
      omit: {
        password: true,
      },
    });

    return user;
  } catch {
    return null;
  }
};

/**
 * {@linkcode getUserByIdAndResources}
 *
 * @param {string} id - search in the database by id
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getUserByIdAndResources = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
      omit: {
        password: true,
      },
      include: {
        _count: {
          select: {
            landingPageCreated: true,
            landingPageUpdated: true,
          },
        },
        landingPagesRequested: {
          orderBy: {
            createdAt: "desc",
          },
          select: {
            id: true,
            name: true,
            slug: true,
            license: {
              select: {
                id: true,
                name: true,
                slug: true,
              },
            },
            language: {
              select: {
                id: true,
                englishName: true,
                iso_639_1: true,
                flag: true,
              },
            },
            design: {
              select: {
                avatars: true,
              },
            },
          },
          take: 5,
        },
      },
    });

    return user;
  } catch {
    return null;
  }
};

/**
 * {@linkcode getTopRequesters}
 *
 * @param {string} id - search in the database by id
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getTopRequesters = async () => {
  try {
    const user = await db.user.findMany({
      omit: {
        password: true,
      },
      include: {
        _count: {
          select: {
            landingPagesRequested: true,
          },
        },
      },
      orderBy: {
        landingPagesRequested: {
          _count: "desc",
        },
      },
      take: 5,
    });

    return user;
  } catch {
    return null;
  }
};
