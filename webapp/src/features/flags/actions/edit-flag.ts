"use server";

import { ACTION_MESSAGES } from "@/constants/messages";
import { getUserById } from "@/features/auth/data";
import { currentUser } from "@/features/auth/lib/auth";
import db from "@/lib/db";
import { prismaError } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { FlagsSchema } from "../schemas/flags-schema";

export const editFlag = async (
  values: z.infer<typeof FlagsSchema>,
  id: string,
) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: ACTION_MESSAGES().UNAUTHORIZED };
  }

  const validatedFields = FlagsSchema.safeParse(values);

  if (!validatedFields.success)
    return { error: ACTION_MESSAGES().INVALID_FIELDS };

  const { name, url } = validatedFields.data;

  const dbUser = await getUserById(user.id);

  if (!dbUser || user.role !== "ADMIN")
    return { error: ACTION_MESSAGES().UNAUTHORIZED };

  const editedUser = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!editedUser) {
    return { error: ACTION_MESSAGES("User").DOES_NOT_EXISTS };
  }

  try {
    await db.dl_avatar_flag.update({
      where: {
        id,
      },
      data: { name, url, updateUserId: editedUser.id },
    });

    return {
      success: ACTION_MESSAGES("Flag").SUCCESS_UPDATE,
    };
  } catch (error) {
    console.error("Something went wrong: ", JSON.stringify(error));

    if (error instanceof Prisma.PrismaClientKnownRequestError)
      return { ...prismaError(error, "Name") };

    throw error;
  }
};
