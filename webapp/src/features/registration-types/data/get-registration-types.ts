import db from "@/lib/db";

/**
 * {@linkcode getRegistrationTypes}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getRegistrationTypes = async () => {
  try {
    const registrationTypes = await db.dl_registration_type.findMany({
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

    return registrationTypes;
  } catch {
    return null;
  }
};

/**
 * {@linkcode getRegistrationTypesMinimal}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getRegistrationTypesMinimal = async () => {
  try {
    const registrationTypes = await db.dl_registration_type.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        slug: true,
        name: true,
      },
    });

    return registrationTypes;
  } catch {
    return null;
  }
};
