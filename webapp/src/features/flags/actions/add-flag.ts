"use server";

import { ACTION_MESSAGES } from "@/constants/messages";
import { getUserById } from "@/features/auth/data/user";
import { currentUser } from "@/features/auth/lib/auth";
import db from "@/lib/db";
import { prismaError } from "@/lib/utils";
import { Prisma, UserRole } from "@prisma/client";
import { z } from "zod";
import { FlagsSchema } from "../schemas/flags-schema";
import { flagsMeta } from "@/constants/page-titles/flags";

export const addFlag = async (values: z.infer<typeof FlagsSchema>) => {
  const user = await currentUser();

  const validatedFields = FlagsSchema.safeParse(values);

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
    await db.dl_avatar_flag.create({
      data: {
        name,
        url,
        createdUserId: dbUser.id,
        updateUserId: dbUser.id,
      },
    });

    return {
      success: ACTION_MESSAGES(flagsMeta.label.singular).SUCCESS_ADD,
    };
  } catch (error) {
    console.error("Something went wrong: ", JSON.stringify(error));

    if (error instanceof Prisma.PrismaClientKnownRequestError)
      return { ...prismaError(error, "Name") };

    throw error;
  }
};
