"use server";

import { getUserById } from "@/features/auth/data/user";
import { currentUser } from "@/features/auth/lib/auth";
import db from "@/lib/db";
import { z } from "zod";
import { BrandLogosSchema } from "../schemas/brand-logos-schema";
import { prismaError } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { ACTION_MESSAGES } from "@/constants/messages";

export const editBrandLogo = async (
  values: z.infer<typeof BrandLogosSchema>,
  id: string,
) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: ACTION_MESSAGES().UNAUTHORIZED };
  }

  const validatedFields = BrandLogosSchema.safeParse(values);

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
    await db.dl_avatar_brand_logo.update({
      where: {
        id,
      },
      data: { name, url, updateUserId: editedUser.id },
    });

    return {
      success: ACTION_MESSAGES("Brand Logo").SUCCESS_UPDATE,
    };
  } catch (error) {
    console.error("Something went wrong: ", JSON.stringify(error));

    if (error instanceof Prisma.PrismaClientKnownRequestError)
      return { ...prismaError(error, "Name") };

    throw error;
  }
};
