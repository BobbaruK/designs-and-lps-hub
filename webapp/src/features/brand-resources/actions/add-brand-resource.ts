"use server";

import { ACTION_MESSAGES } from "@/constants/messages";
import { brandLogosMeta } from "@/constants/page-titles/brand-logos";
import { getUserById } from "@/features/auth/data/user";
import { currentUser } from "@/features/auth/lib/auth";
import db from "@/lib/db";
import { prismaError } from "@/lib/utils";
import { Prisma, UserRole } from "@prisma/client";
import { z } from "zod";
import { BrandResourceSchema } from "../schemas/brand-resource-schema";

export const addBrandResource = async (
  values: z.infer<typeof BrandResourceSchema>,
) => {
  const user = await currentUser();

  const validatedFields = BrandResourceSchema.safeParse(values);

  if (!validatedFields.success)
    return { error: ACTION_MESSAGES().INVALID_FIELDS };

  const { name, url, type, brand } = validatedFields.data;

  if (!user || !user.id) {
    return { error: ACTION_MESSAGES().UNAUTHORIZED };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser || user.role !== UserRole.ADMIN)
    return { error: ACTION_MESSAGES().UNAUTHORIZED };

  try {
    await db.dl_brand_resource.create({
      data: {
        name,
        url,
        type,
        brandId: brand,
        createdUserId: dbUser.id,
        updateUserId: dbUser.id,
      },
    });

    return {
      success: ACTION_MESSAGES(brandLogosMeta.label.singular).SUCCESS_ADD,
    };
  } catch (error) {
    console.error("Something went wrong: ", JSON.stringify(error));

    if (error instanceof Prisma.PrismaClientKnownRequestError)
      return { ...prismaError(error, "Name") };

    throw error;
  }
};
