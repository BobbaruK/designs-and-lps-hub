"use server";

import { ACTION_MESSAGES } from "@/constants/messages";
import { languagesMeta } from "@/constants/page-titles/languages";
import { getUserById } from "@/features/auth/data/user";
import { currentUser } from "@/features/auth/lib/auth";
import db from "@/lib/db";
import { prismaError } from "@/lib/utils";
import { Prisma, UserRole } from "@prisma/client";
import { z } from "zod";
import { LanguageSchema } from "../schemas/language-schema";

export const editLanguage = async (
  values: z.infer<typeof LanguageSchema>,
  id: string,
) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: ACTION_MESSAGES().UNAUTHORIZED };
  }

  const validatedFields = LanguageSchema.safeParse(values);

  if (!validatedFields.success)
    return { error: ACTION_MESSAGES().INVALID_FIELDS };

  const { name, englishName, iso_639_1, iso_3166_1, flag } =
    validatedFields.data;

  const dbUser = await getUserById(user.id);

  if (!dbUser || user.role === UserRole.USER)
    return { error: ACTION_MESSAGES().UNAUTHORIZED };

  try {
    await db.dl_language.update({
      where: {
        id,
      },
      data: {
        name,
        englishName,
        iso_639_1,
        iso_3166_1: iso_3166_1 || null,
        flag: flag || null,
        updateUserId: dbUser.id,
      },
    });

    return {
      success: ACTION_MESSAGES(languagesMeta.label.singular).SUCCESS_UPDATE,
    };
  } catch (error) {
    console.error("Something went wrong: ", JSON.stringify(error));

    if (error instanceof Prisma.PrismaClientKnownRequestError)
      return { ...prismaError(error, "Name, EnglishName and/or iso_639_1") };

    throw error;
  }
};
