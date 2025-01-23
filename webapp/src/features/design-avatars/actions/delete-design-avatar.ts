"use server";

import { ACTION_MESSAGES } from "@/constants/messages";
import { designAvatarsMeta } from "@/constants/page-titles/design-avatars";
import { getUserById } from "@/features/auth/data/user";
import { currentUser } from "@/features/auth/lib/auth";
import db from "@/lib/db";
import { prismaError } from "@/lib/utils";
import { Prisma, UserRole } from "@prisma/client";

export const deleteDesignAvatar = async (id: string) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: ACTION_MESSAGES().UNAUTHORIZED };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser || user.role !== UserRole.ADMIN)
    return { error: ACTION_MESSAGES().UNAUTHORIZED };

  const existingAvatarDesign = await db.dl_avatar_design.findUnique({
    where: {
      id,
    },
  });

  if (!existingAvatarDesign)
    return {
      error: ACTION_MESSAGES(designAvatarsMeta.label.singular).DOES_NOT_EXISTS,
    };

  try {
    await db.dl_avatar_design.delete({
      where: { id },
    });

    await db.dl_design.updateMany({
      where: { avatar: existingAvatarDesign.url },
      data: { avatar: null },
    });

    return {
      success: ACTION_MESSAGES(designAvatarsMeta.label.singular).SUCCESS_DELETE,
    };
  } catch (error) {
    console.error("Something went wrong: ", JSON.stringify(error));

    if (error instanceof Prisma.PrismaClientKnownRequestError)
      return { ...prismaError(error, "Name") };

    throw error;
  }
};
