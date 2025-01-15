import db from "@/lib/db";

/**
 * {@linkcode getUsers}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getUsers = async () => {
  try {
    const user = await db.user.findMany({
      omit: {
        password: true,
      },
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
        formValidationCreated: false,
        formValidationUpdated: false,
      },
      orderBy: {
        createdAt: "desc",
      },
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
