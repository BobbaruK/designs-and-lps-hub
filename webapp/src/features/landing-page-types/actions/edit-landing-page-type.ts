"use server";

import { ACTION_MESSAGES } from "@/constants/messages";
import { landingPageTypeMeta } from "@/constants/page-titles/landing-page-type";
import { getUserById } from "@/features/auth/data/user";
import { currentUser } from "@/features/auth/lib/auth";
import db from "@/lib/db";
import { prismaError } from "@/lib/utils";
import { Prisma, UserRole } from "@prisma/client";
import { z } from "zod";
import { LandingPageTypeSchema } from "../schemas/landing-page-type-schema";

export const editLandingPageType = async (
  values: z.infer<typeof LandingPageTypeSchema>,
  id: string,
) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: ACTION_MESSAGES().UNAUTHORIZED };
  }

  const validatedFields = LandingPageTypeSchema.safeParse(values);

  if (!validatedFields.success)
    return { error: ACTION_MESSAGES().INVALID_FIELDS };

  const { name, slug, description } = validatedFields.data;

  const dbUser = await getUserById(user.id);

  if (!dbUser || user.role === UserRole.USER)
    return { error: ACTION_MESSAGES().UNAUTHORIZED };

  try {
    await db.dl_landing_page_type.update({
      where: {
        id,
      },
      data: {
        name,
        slug,
        description: description || null,
        updateUserId: dbUser.id,
      },
    });

    return {
      success: ACTION_MESSAGES(landingPageTypeMeta.label.singular)
        .SUCCESS_UPDATE,
    };
  } catch (error) {
    console.error("Something went wrong: ", JSON.stringify(error));

    if (error instanceof Prisma.PrismaClientKnownRequestError)
      return { ...prismaError(error, "Name and/or Slug") };

    throw error;
  }
};
