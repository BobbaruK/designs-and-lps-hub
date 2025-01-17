"use server";

import { ACTION_MESSAGES } from "@/constants/messages";
import { getUserById } from "@/features/auth/data/user";
import { currentUser } from "@/features/auth/lib/auth";
import db from "@/lib/db";
import { prismaError } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { DesignAvatarSchema } from "../schemas/design-avatar-schema";

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

  if (!dbUser || (user.role !== "ADMIN" && user.role !== "EDITOR"))
    return { error: ACTION_MESSAGES().UNAUTHORIZED };

  const userAdding = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });

  try {
    await db.dl_avatar_design.create({
      data: {
        name,
        url,
        createdUserId: userAdding?.id,
        updateUserId: userAdding?.id,
      },
    });

    return {
      success: ACTION_MESSAGES("Design Avatar").SUCCESS_ADD,
    };
  } catch (error) {
    console.error("Something went wrong: ", JSON.stringify(error));

    if (error instanceof Prisma.PrismaClientKnownRequestError)
      return { ...prismaError(error, "Name") };

    throw error;
  }
};
