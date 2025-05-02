import { PAGINATION_DEFAULT } from "@/constants/table";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";

/**
 * {@linkcode getRegistrationTypes}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getRegistrationTypes = async ({
  where,
  perPage,
  pageNumber,
  orderBy,
}: {
  where?: Prisma.dl_registration_typeWhereInput;
  perPage?: number;
  pageNumber?: number;
  orderBy?: Prisma.dl_registration_typeOrderByWithRelationInput;
}) => {
  const pageSize = perPage || PAGINATION_DEFAULT;
  const skip = pageNumber ? pageNumber * pageSize : 0;

  try {
    const registrationTypes = await db.dl_registration_type.findMany({
      ...(orderBy ? { orderBy } : {}),
      include: {
        createdBy: true,
        updatedBy: true,
        _count: {
          select: {
            landingPages: true,
          },
        },
      },
      ...(where ? { where } : {}),
      skip,
      take: perPage || undefined,
    });

    return registrationTypes;
  } catch {
    return null;
  }
};

/**
 * {@linkcode getRegistrationTypesCount}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getRegistrationTypesCount = async (
  where?: Prisma.dl_registration_typeWhereInput,
) => {
  try {
    const brandsCount = await db.dl_registration_type.count({
      ...(where ? { where } : {}),
    });

    return brandsCount;
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
