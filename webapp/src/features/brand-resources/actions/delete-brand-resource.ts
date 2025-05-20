"use server";

import { ACTION_MESSAGES } from "@/constants/messages";
import { brandResourcesMeta } from "@/constants/page-titles/brand-resources";
import { getUserById } from "@/features/auth/data/user";
import { currentUser } from "@/features/auth/lib/auth";
import db from "@/lib/db";
import { prismaError } from "@/lib/utils";
import { Prisma, UserRole } from "@prisma/client";

export const deleteBrandResource = async (id: string) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: ACTION_MESSAGES().UNAUTHORIZED };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser || user.role !== UserRole.ADMIN)
    return { error: ACTION_MESSAGES().UNAUTHORIZED };

  const existingBrandResource = await db.dl_brand_resource.findUnique({
    where: {
      id,
    },
  });

  if (!existingBrandResource)
    return {
      error: ACTION_MESSAGES(brandResourcesMeta.label.plural).DOES_NOT_EXISTS,
    };

  try {
    await db.dl_brand_resource.delete({
      where: { id },
    });

    return {
      success: ACTION_MESSAGES(brandResourcesMeta.label.plural).SUCCESS_DELETE,
    };
  } catch (error) {
    console.error("Something went wrong: ", JSON.stringify(error));

    if (error instanceof Prisma.PrismaClientKnownRequestError)
      return { ...prismaError(error, "Name") };

    throw error;
  }
};

export const deleteManyBrandResources = async (ids: string[]) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: ACTION_MESSAGES().UNAUTHORIZED };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser || user.role !== UserRole.ADMIN)
    return { error: ACTION_MESSAGES().UNAUTHORIZED };

  const existingBrandResources = await db.dl_brand_resource.findMany({
    where: {
      id: { in: ids },
    },
  });

  if (!existingBrandResources)
    return {
      error: ACTION_MESSAGES(brandResourcesMeta.label.plural).DOES_NOT_EXISTS,
    };

  try {
    await db.dl_brand_resource.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return {
      success: ACTION_MESSAGES(brandResourcesMeta.label.plural).SUCCESS_DELETE,
    };
  } catch (error) {
    console.error("Something went wrong: ", JSON.stringify(error));

    if (error instanceof Prisma.PrismaClientKnownRequestError)
      return { ...prismaError(error, "Name") };

    throw error;
  }
};
