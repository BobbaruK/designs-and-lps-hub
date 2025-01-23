"use server";

import { ACTION_MESSAGES } from "@/constants/messages";
import { languagesMeta } from "@/constants/page-titles/languages";
import { getUserById } from "@/features/auth/data/user";
import { currentUser } from "@/features/auth/lib/auth";
import db from "@/lib/db";
import { prismaError } from "@/lib/utils";
import { Prisma, UserRole } from "@prisma/client";

export const deleteLanguage = async (id: string) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: ACTION_MESSAGES().UNAUTHORIZED };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser || user.role === UserRole.USER)
    return { error: ACTION_MESSAGES().UNAUTHORIZED };

  const existingFormValidation = await db.dl_language.findUnique({
    where: {
      id,
    },
  });

  if (!existingFormValidation)
    return { error: ACTION_MESSAGES(languagesMeta.label.singular).DOES_NOT_EXISTS };

  try {
    await db.dl_language.delete({
      where: { id },
    });

    return {
      success: ACTION_MESSAGES(languagesMeta.label.singular).SUCCESS_DELETE,
    };
  } catch (error) {
    console.error("Something went wrong: ", JSON.stringify(error));

    if (error instanceof Prisma.PrismaClientKnownRequestError)
      return { ...prismaError(error, "Name, EnglishName and/or iso_639_1") };

    throw error;
  }
};
