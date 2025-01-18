"use server";

import { ACTION_MESSAGES } from "@/constants/messages";
import { getUserById } from "@/features/auth/data/user";
import { currentUser } from "@/features/auth/lib/auth";
import db from "@/lib/db";
import { prismaError } from "@/lib/utils";
import { Prisma } from "@prisma/client";

export const deleteBrandLogo = async (id: string) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: ACTION_MESSAGES().UNAUTHORIZED };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser || user.role !== "ADMIN")
    return { error: ACTION_MESSAGES().UNAUTHORIZED };

  const existingBrandLogo = await db.dl_avatar_brand_logo.findUnique({
    where: {
      id,
    },
  });

  if (!existingBrandLogo)
    return { error: ACTION_MESSAGES("Brand Logo").DOES_NOT_EXISTS };

  try {
    await db.dl_avatar_brand_logo.delete({
      where: { id },
    });

    await db.dl_brand.updateMany({
      where: { logo: existingBrandLogo.url },
      data: { logo: null },
    });

    return {
      success: ACTION_MESSAGES("Brand Logo").SUCCESS_DELETE,
    };
  } catch (error) {
    console.error("Something went wrong: ", JSON.stringify(error));

    if (error instanceof Prisma.PrismaClientKnownRequestError)
      return { ...prismaError(error, "Name") };

    throw error;
  }
};
