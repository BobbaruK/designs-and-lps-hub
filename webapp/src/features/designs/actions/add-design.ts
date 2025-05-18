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

export const addDesign = async (values: z.infer<typeof DesignSchema>) => {
  const user = await currentUser();

  const validatedFields = DesignSchema.safeParse(values);

  if (!validatedFields.success)
    return { error: ACTION_MESSAGES().INVALID_FIELDS };

  const { name, slug, avatars } = validatedFields.data;

  if (!user || !user.id) {
    return { error: ACTION_MESSAGES().UNAUTHORIZED };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser || user.role === UserRole.USER)
    return { error: ACTION_MESSAGES().UNAUTHORIZED };

  const userAdding = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });

  try {
    const avatarsIds = avatars.map((avatar) => avatar.value);

    await db.dl_avatar_design.updateMany({
      where: {
        id: { in: avatarsIds },
      },
      data: {
        isUsed: true,
      },
    });

    await db.dl_design.create({
      data: {
        name,
        slug,
        avatars: {
          connect: avatars.map((avatar) => ({ id: avatar.value })),
        },
        createdUserId: userAdding?.id,
        updateUserId: userAdding?.id,
      },
    });

    return {
      success: ACTION_MESSAGES(designsMeta.label.singular).SUCCESS_ADD,
    };
  } catch (error) {
    console.error("Something went wrong: ", JSON.stringify(error));

    if (error instanceof Prisma.PrismaClientKnownRequestError)
      return { ...prismaError(error, "Name and/or Slug") };

    throw error;
  }
};
