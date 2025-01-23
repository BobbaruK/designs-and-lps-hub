"use server";

import { ACTION_MESSAGES } from "@/constants/messages";
import { formValidationsMeta } from "@/constants/page-titles/form-validations";
import { getUserById } from "@/features/auth/data/user";
import { currentUser } from "@/features/auth/lib/auth";
import db from "@/lib/db";
import { prismaError } from "@/lib/utils";
import { Prisma, UserRole } from "@prisma/client";

export const deleteFormValidation = async (id: string) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: ACTION_MESSAGES().UNAUTHORIZED };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser || user.role === UserRole.USER)
    return { error: ACTION_MESSAGES().UNAUTHORIZED };

  const existingFormValidation = await db.dl_form_validation.findUnique({
    where: {
      id,
    },
  });

  if (!existingFormValidation)
    return {
      error: ACTION_MESSAGES(formValidationsMeta.label.singular)
        .DOES_NOT_EXISTS,
    };

  try {
    await db.dl_form_validation.delete({
      where: { id },
    });

    return {
      success: ACTION_MESSAGES(formValidationsMeta.label.singular)
        .SUCCESS_DELETE,
    };
  } catch (error) {
    console.error("Something went wrong: ", JSON.stringify(error));

    if (error instanceof Prisma.PrismaClientKnownRequestError)
      return { ...prismaError(error, "Name and/or Slug") };

    throw error;
  }
};
