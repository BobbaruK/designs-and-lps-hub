"use server";

import { ACTION_MESSAGES } from "@/constants/messages";
import { flagsMeta } from "@/constants/page-titles/flags";
import { getUserById } from "@/features/auth/data/user";
import { currentUser } from "@/features/auth/lib/auth";
import db from "@/lib/db";
import { prismaError } from "@/lib/utils";
import { Prisma, UserRole } from "@prisma/client";

export const deleteFlag = async (id: string) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: ACTION_MESSAGES().UNAUTHORIZED };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser || user.role !== UserRole.ADMIN)
    return { error: ACTION_MESSAGES().UNAUTHORIZED };

  const existingFlag = await db.dl_avatar_flag.findUnique({
    where: {
      id,
    },
  });

  if (!existingFlag)
    return { error: ACTION_MESSAGES(flagsMeta.label.plural).DOES_NOT_EXISTS };

  try {
    await db.dl_avatar_flag.delete({
      where: { id },
    });

    await db.dl_language.updateMany({
      where: { flag: existingFlag.url },
      data: { flag: null },
    });

    return {
      success: ACTION_MESSAGES(flagsMeta.label.plural).SUCCESS_DELETE,
    };
  } catch (error) {
    console.error("Something went wrong: ", JSON.stringify(error));

    if (error instanceof Prisma.PrismaClientKnownRequestError)
      return { ...prismaError(error, "Name") };

    throw error;
  }
};

export const deleteManyFlags = async (ids: string[]) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: ACTION_MESSAGES().UNAUTHORIZED };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser || user.role !== UserRole.ADMIN)
    return { error: ACTION_MESSAGES().UNAUTHORIZED };

  const existingFlags = await db.dl_avatar_flag.findMany({
    where: {
      id: { in: ids },
    },
  });

  if (!existingFlags)
    return { error: ACTION_MESSAGES(flagsMeta.label.plural).DOES_NOT_EXISTS };

  try {
    await db.dl_language.updateMany({
      where: { flag: { in: existingFlags.map((flag) => flag.url) } },
      data: { flag: null },
    });

    await db.dl_avatar_flag.deleteMany({
      where: { id: { in: ids } },
    });

    return {
      success: ACTION_MESSAGES(flagsMeta.label.plural).SUCCESS_DELETE,
    };
  } catch (error) {
    console.error("Something went wrong: ", JSON.stringify(error));

    if (error instanceof Prisma.PrismaClientKnownRequestError)
      return { ...prismaError(error, "Name") };

    throw error;
  }
};
