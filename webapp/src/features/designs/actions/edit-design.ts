"use server";

import { ACTION_MESSAGES } from "@/constants/messages";
import { designsMeta } from "@/constants/page-titles/designs";
import { getUserById } from "@/features/auth/data/user";
import { currentUser } from "@/features/auth/lib/auth";
import db from "@/lib/db";
import { prismaError } from "@/lib/utils";
import { Prisma, UserRole } from "@prisma/client";
import { z } from "zod";
import { DesignSchema } from "../schemas/design-schema";

export const editDesign = async (
  values: z.infer<typeof DesignSchema>,
  id: string,
) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: ACTION_MESSAGES().UNAUTHORIZED };
  }

  const validatedFields = DesignSchema.safeParse(values);

  if (!validatedFields.success)
    return { error: ACTION_MESSAGES().INVALID_FIELDS };

  const { name, slug, avatar } = validatedFields.data;

  const dbUser = await getUserById(user.id);

  if (!dbUser || user.role === UserRole.USER)
    return { error: ACTION_MESSAGES().UNAUTHORIZED };

  try {
    await db.dl_design.update({
      where: {
        id,
      },
      data: {
        name,
        slug,
        avatar,
        updateUserId: dbUser.id,
      },
    });

    return {
      success: ACTION_MESSAGES(designsMeta.label.singular).SUCCESS_UPDATE,
    };
  } catch (error) {
    console.error("Something went wrong: ", JSON.stringify(error));

    if (error instanceof Prisma.PrismaClientKnownRequestError)
      return { ...prismaError(error, "Name and/or Slug") };

    throw error;
  }
};
