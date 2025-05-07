"use server";

import { ACTION_MESSAGES } from "@/constants/messages";
import { designsMeta } from "@/constants/page-titles/designs";
import { getUserById } from "@/features/auth/data/user";
import { currentUser } from "@/features/auth/lib/auth";
import db from "@/lib/db";
import { prismaError } from "@/lib/utils";
import { Prisma, UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const deleteDesign = async (id: string) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: ACTION_MESSAGES().UNAUTHORIZED };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser || user.role === UserRole.USER)
    return { error: ACTION_MESSAGES().UNAUTHORIZED };

  const existingBrand = await db.dl_design.findUnique({
    where: {
      id,
    },
  });

  if (!existingBrand)
    return {
      error: ACTION_MESSAGES(designsMeta.label.singular).DOES_NOT_EXISTS,
    };

  try {
    await db.dl_design.delete({
      where: { id },
    });

    return {
      success: ACTION_MESSAGES(designsMeta.label.singular).SUCCESS_DELETE,
    };
  } catch (error) {
    console.error("Something went wrong: ", JSON.stringify(error));

    if (error instanceof Prisma.PrismaClientKnownRequestError)
      return { ...prismaError(error, "Name and/or Slug") };

    throw error;
  }
};

export const deleteManyDesigns = async (ids: string[]) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: ACTION_MESSAGES().UNAUTHORIZED };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser || user.role === UserRole.USER)
    return { error: ACTION_MESSAGES().UNAUTHORIZED };

  const existingBrand = await db.dl_design.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  if (!existingBrand)
    return {
      error: ACTION_MESSAGES(designsMeta.label.plural).DOES_NOT_EXISTS,
    };

  try {
    await db.dl_design.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    revalidatePath("/");

    return {
      success: ACTION_MESSAGES(designsMeta.label.plural).SUCCESS_DELETE,
    };
  } catch (error) {
    revalidatePath("/");

    console.error("Something went wrong: ", JSON.stringify(error));

    if (error instanceof Prisma.PrismaClientKnownRequestError)
      return { ...prismaError(error, "Name and/or Slug") };

    throw error;
  }
};
