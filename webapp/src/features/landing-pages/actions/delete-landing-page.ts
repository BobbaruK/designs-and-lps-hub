"use server";

import { ACTION_MESSAGES } from "@/constants/messages";
import { landingPagesMeta } from "@/constants/page-titles/landing-pages";
import { getUserById } from "@/features/auth/data/user";
import { currentUser } from "@/features/auth/lib/auth";
import db from "@/lib/db";
import { prismaError } from "@/lib/utils";
import { Prisma, UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const deleteLandingPage = async (id: string) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: ACTION_MESSAGES().UNAUTHORIZED };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser || user.role === UserRole.USER)
    return { error: ACTION_MESSAGES().UNAUTHORIZED };

  const existingBrand = await db.dl_landing_page.findUnique({
    where: {
      id,
    },
  });

  if (!existingBrand)
    return {
      error: ACTION_MESSAGES(landingPagesMeta.label.singular).DOES_NOT_EXISTS,
    };

  try {
    await db.dl_landing_page.delete({
      where: { id },
    });

    return {
      success: ACTION_MESSAGES(landingPagesMeta.label.singular).SUCCESS_DELETE,
    };
  } catch (error) {
    console.error("Something went wrong: ", JSON.stringify(error));

    if (error instanceof Prisma.PrismaClientKnownRequestError)
      return { ...prismaError(error, "Name, Slug and/or URL") };

    throw error;
  }
};

export const deleteManyLandingPages = async (ids: string[]) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: ACTION_MESSAGES().UNAUTHORIZED };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser || user.role === UserRole.USER)
    return { error: ACTION_MESSAGES().UNAUTHORIZED };

  const existingLPs = await db.dl_landing_page.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  if (!existingLPs)
    return {
      error: ACTION_MESSAGES(landingPagesMeta.label.plural).DOES_NOT_EXISTS,
    };

  try {
    await db.dl_landing_page.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    revalidatePath("/");

    return {
      success: ACTION_MESSAGES(landingPagesMeta.label.plural).SUCCESS_DELETE,
    };
  } catch (error) {
    revalidatePath("/");

    console.error("Something went wrong: ", JSON.stringify(error));

    if (error instanceof Prisma.PrismaClientKnownRequestError)
      return { ...prismaError(error, "Name, Slug and/or URL") };

    throw error;
  }
};
