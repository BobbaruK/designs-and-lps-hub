"use server";

import { ACTION_MESSAGES } from "@/constants/messages";
import { getUserById } from "@/features/auth/data/user";
import { currentUser } from "@/features/auth/lib/auth";
import db from "@/lib/db";
import { prismaError } from "@/lib/utils";
import { Prisma } from "@prisma/client";

export const deleteDesignAvatar = async (id: string) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: ACTION_MESSAGES().UNAUTHORIZED };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser || user.role !== "ADMIN")
    return { error: ACTION_MESSAGES().UNAUTHORIZED };

  const existingBrandLogo = await db.dl_avatar_design.findUnique({
    where: {
      id,
    },
  });

  if (!existingBrandLogo)
    return { error: ACTION_MESSAGES("Design Avatar").DOES_NOT_EXISTS };

  try {
    await db.dl_avatar_design.delete({
      where: { id },
    });

    await db.dl_design.updateMany({
      where: { avatar: existingBrandLogo.url },
      data: { avatar: null },
    });

    return {
      success: ACTION_MESSAGES("Design avatar").SUCCESS_DELETE,
    };
  } catch (error) {
    console.error("Something went wrong: ", JSON.stringify(error));

    if (error instanceof Prisma.PrismaClientKnownRequestError)
      return { ...prismaError(error, "Name") };

    throw error;
  }
};
