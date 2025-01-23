"use server";

import { ACTION_MESSAGES } from "@/constants/messages";
import { getUserById } from "@/features/auth/data/user";
import { currentUser } from "@/features/auth/lib/auth";
import db from "@/lib/db";
import { prismaError } from "@/lib/utils";
import { Prisma, UserRole } from "@prisma/client";
import { z } from "zod";
import { DesignAvatarSchema } from "../schemas/design-avatar-schema";
import { designAvatarsMeta } from "@/constants/page-titles/design-avatars";

export const addDesignAvatar = async (
  values: z.infer<typeof DesignAvatarSchema>,
) => {
  const user = await currentUser();

  const validatedFields = DesignAvatarSchema.safeParse(values);

  if (!validatedFields.success)
    return { error: ACTION_MESSAGES().INVALID_FIELDS };

  const { name, url } = validatedFields.data;

  if (!user || !user.id) {
    return { error: ACTION_MESSAGES().UNAUTHORIZED };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser || user.role !== UserRole.ADMIN)
    return { error: ACTION_MESSAGES().UNAUTHORIZED };

  try {
    await db.dl_avatar_design.create({
      data: {
        name,
        url,
        createdUserId: dbUser.id,
        updateUserId: dbUser.id,
      },
    });

    return {
      success: ACTION_MESSAGES(designAvatarsMeta.label.singular).SUCCESS_ADD,
    };
  } catch (error) {
    console.error("Something went wrong: ", JSON.stringify(error));

    if (error instanceof Prisma.PrismaClientKnownRequestError)
      return { ...prismaError(error, "Name") };

    throw error;
  }
};
