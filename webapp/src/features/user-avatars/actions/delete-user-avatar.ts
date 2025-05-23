"use server";

import { ACTION_MESSAGES } from "@/constants/messages";
import { userAvatarMeta } from "@/constants/page-titles/user-avatars";
import { getUserById } from "@/features/auth/data/user";
import { currentUser } from "@/features/auth/lib/auth";
import db from "@/lib/db";
import { prismaError } from "@/lib/utils";
import { Prisma, UserRole } from "@prisma/client";

export const deleteUserAvatar = async (id: string) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: ACTION_MESSAGES().UNAUTHORIZED };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser || user.role !== UserRole.ADMIN)
    return { error: ACTION_MESSAGES().UNAUTHORIZED };

  const existingAvatar = await db.dl_avatar_user.findUnique({
    where: {
      id,
    },
  });

  if (!existingAvatar)
    return {
      error: ACTION_MESSAGES(userAvatarMeta.label.plural).DOES_NOT_EXISTS,
    };

  try {
    await db.user.updateMany({
      where: { image: existingAvatar.url },
      data: { image: null },
    });

    await db.dl_avatar_user.delete({
      where: { id },
    });

    return {
      success: ACTION_MESSAGES(userAvatarMeta.label.plural).SUCCESS_DELETE,
    };
  } catch (error) {
    console.error("Something went wrong: ", JSON.stringify(error));

    if (error instanceof Prisma.PrismaClientKnownRequestError)
      return { ...prismaError(error, "Name") };

    throw error;
  }
};

export const deleteManyUserAvatars = async (ids: string[]) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: ACTION_MESSAGES().UNAUTHORIZED };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser || user.role !== UserRole.ADMIN)
    return { error: ACTION_MESSAGES().UNAUTHORIZED };

  const existingAvatars = await db.dl_avatar_user.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  if (!existingAvatars)
    return {
      error: ACTION_MESSAGES(userAvatarMeta.label.plural).DOES_NOT_EXISTS,
    };

  try {
    await db.user.updateMany({
      where: { image: { in: existingAvatars.map((avatar) => avatar.url) } },
      data: { image: null },
    });

    await db.dl_avatar_user.deleteMany({
      where: { id: { in: ids } },
    });

    return {
      success: ACTION_MESSAGES(userAvatarMeta.label.plural).SUCCESS_DELETE,
    };
  } catch (error) {
    console.error("Something went wrong: ", JSON.stringify(error));

    if (error instanceof Prisma.PrismaClientKnownRequestError)
      return { ...prismaError(error, "Name") };

    throw error;
  }
};
