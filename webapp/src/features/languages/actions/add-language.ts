"use server";

import { ACTION_MESSAGES } from "@/constants/messages";
import { getUserById } from "@/features/auth/data/user";
import { currentUser } from "@/features/auth/lib/auth";
import db from "@/lib/db";
import { prismaError } from "@/lib/utils";
import { Prisma, UserRole } from "@prisma/client";
import { z } from "zod";
import { LanguageSchema } from "../schemas/language-schema";

export const addLanguage = async (values: z.infer<typeof LanguageSchema>) => {
  const user = await currentUser();

  const validatedFields = LanguageSchema.safeParse(values);

  if (!validatedFields.success)
    return { error: ACTION_MESSAGES().INVALID_FIELDS };

  const { name, englishName, iso_639_1, iso_3166_1, flag } =
    validatedFields.data;

  if (!user || !user.id) {
    return { error: ACTION_MESSAGES().UNAUTHORIZED };
  }

  const dbUser = await getUserById(user.id);

  if (
    !dbUser ||
    (user.role !== UserRole.ADMIN && user.role !== UserRole.EDITOR)
  )
    return { error: ACTION_MESSAGES().UNAUTHORIZED };

  const userAdding = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });

  try {
    await db.dl_language.create({
      data: {
        name,
        englishName,
        iso_639_1,
        iso_3166_1: iso_3166_1 || null,
        flag: flag || null,
        createdUserId: userAdding?.id,
        updateUserId: userAdding?.id,
      },
    });

    return {
      success: ACTION_MESSAGES("Language").SUCCESS_ADD,
    };
  } catch (error) {
    console.error("Something went wrong: ", JSON.stringify(error));

    if (error instanceof Prisma.PrismaClientKnownRequestError)
      return { ...prismaError(error, "Name and/or Slug") };

    throw error;
  }
};
