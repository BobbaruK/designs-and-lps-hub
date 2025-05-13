"use server";

import { ACTION_MESSAGES } from "@/constants/messages";
import { registrationTypesMeta } from "@/constants/page-titles/registration-types";
import { getUserById } from "@/features/auth/data/user";
import { currentUser } from "@/features/auth/lib/auth";
import db from "@/lib/db";
import { prismaError } from "@/lib/utils";
import { Prisma, UserRole } from "@prisma/client";

export const deleteRegistrationType = async (id: string) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: ACTION_MESSAGES().UNAUTHORIZED };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser || user.role === UserRole.USER)
    return { error: ACTION_MESSAGES().UNAUTHORIZED };

  const existingRegistrationType = await db.dl_registration_type.findUnique({
    where: {
      id,
    },
  });

  if (!existingRegistrationType)
    return {
      error: ACTION_MESSAGES(registrationTypesMeta.label.singular)
        .DOES_NOT_EXISTS,
    };

  try {
    await db.dl_registration_type.delete({
      where: { id },
    });

    return {
      success: ACTION_MESSAGES(registrationTypesMeta.label.singular)
        .SUCCESS_DELETE,
    };
  } catch (error) {
    console.error("Something went wrong: ", JSON.stringify(error));

    if (error instanceof Prisma.PrismaClientKnownRequestError)
      return { ...prismaError(error, "Name and/or Slug") };

    throw error;
  }
};

export const deleteManyRegistrationTypes = async (ids: string[]) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: ACTION_MESSAGES().UNAUTHORIZED };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser || user.role === UserRole.USER)
    return { error: ACTION_MESSAGES().UNAUTHORIZED };

  const existingRegistrationTypes = await db.dl_registration_type.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  if (!existingRegistrationTypes)
    return {
      error: ACTION_MESSAGES(registrationTypesMeta.label.plural)
        .DOES_NOT_EXISTS,
    };

  try {
    await db.dl_registration_type.deleteMany({
      where: { id: { in: ids } },
    });

    return {
      success: ACTION_MESSAGES(registrationTypesMeta.label.plural)
        .SUCCESS_DELETE,
    };
  } catch (error) {
    console.error("Something went wrong: ", JSON.stringify(error));

    if (error instanceof Prisma.PrismaClientKnownRequestError)
      return { ...prismaError(error, "Name and/or Slug") };

    throw error;
  }
};
