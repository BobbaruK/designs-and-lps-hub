"use server";

import { ACTION_MESSAGES } from "@/constants/messages";
import { featuresTypeMeta } from "@/constants/page-titles/features";
import { getUserById } from "@/features/auth/data/user";
import { currentUser } from "@/features/auth/lib/auth";
import db from "@/lib/db";
import { prismaError } from "@/lib/utils";
import { Prisma, UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const deleteLandingPageFeature = async (id: string) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: ACTION_MESSAGES().UNAUTHORIZED };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser || user.role === UserRole.USER)
    return { error: ACTION_MESSAGES().UNAUTHORIZED };

  const existingregistrationType = await db.dl_features.findUnique({
    where: {
      id,
    },
  });

  if (!existingregistrationType)
    return {
      error: ACTION_MESSAGES(featuresTypeMeta.label.singular).DOES_NOT_EXISTS,
    };

  try {
    await db.dl_features.delete({
      where: { id },
    });

    return {
      success: ACTION_MESSAGES(featuresTypeMeta.label.singular).SUCCESS_DELETE,
    };
  } catch (error) {
    console.error("Something went wrong: ", JSON.stringify(error));

    if (error instanceof Prisma.PrismaClientKnownRequestError)
      return { ...prismaError(error, "Name and/or Slug") };

    throw error;
  }
};

export const deleteManyLandingPageFeature = async (ids: string[]) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: ACTION_MESSAGES().UNAUTHORIZED };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser || user.role === UserRole.USER)
    return { error: ACTION_MESSAGES().UNAUTHORIZED };

  const existingFeatures = await db.dl_features.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  if (!existingFeatures)
    return {
      error: ACTION_MESSAGES(featuresTypeMeta.label.plural).DOES_NOT_EXISTS,
    };

  try {
    await db.dl_features.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    revalidatePath("/");

    return {
      success: ACTION_MESSAGES(featuresTypeMeta.label.plural).SUCCESS_DELETE,
    };
  } catch (error) {
    revalidatePath("/");

    console.error("Something went wrong: ", JSON.stringify(error));

    if (error instanceof Prisma.PrismaClientKnownRequestError)
      return { ...prismaError(error, "Name and/or Slug") };

    throw error;
  }
};
