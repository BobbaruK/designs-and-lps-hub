"use server";

import { getUserById } from "@/features/auth/data/user";
import { currentUser } from "@/features/auth/lib/auth";
import db from "@/lib/db";
import { z } from "zod";
import { BrandLogosSchema } from "../schemas/brand-logos-schema";
import { prismaError } from "@/lib/utils";
import { Prisma, UserRole } from "@prisma/client";
import { ACTION_MESSAGES } from "@/constants/messages";
import { brandLogosMeta } from "@/constants/page-titles/brand-logos";

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

  if (!dbUser || user.role !== UserRole.ADMIN)
    return { error: ACTION_MESSAGES().UNAUTHORIZED };

  try {
    await db.dl_avatar_brand_logo.update({
      where: {
        id,
      },
      data: { name, url, updateUserId: dbUser.id },
    });

    return {
      success: ACTION_MESSAGES(brandLogosMeta.label.singular).SUCCESS_UPDATE,
    };
  } catch (error) {
    console.error("Something went wrong: ", JSON.stringify(error));

    if (error instanceof Prisma.PrismaClientKnownRequestError)
      return { ...prismaError(error, "Name") };

    throw error;
  }
};
