"use server";

import { ACTION_MESSAGES } from "@/constants/messages";
import { brandLogosMeta } from "@/constants/page-titles/brand-logos";
import { getUserById } from "@/features/auth/data/user";
import { currentUser } from "@/features/auth/lib/auth";
import db from "@/lib/db";
import { prismaError } from "@/lib/utils";
import { Prisma, UserRole } from "@prisma/client";

export const deleteBrandLogo = async (id: string) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: ACTION_MESSAGES().UNAUTHORIZED };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser || user.role !== UserRole.ADMIN)
    return { error: ACTION_MESSAGES().UNAUTHORIZED };

  const existingBrandLogo = await db.dl_avatar_brand_logo.findUnique({
    where: {
      id,
    },
  });

  if (!existingBrandLogo)
    return {
      error: ACTION_MESSAGES(brandLogosMeta.label.plural).DOES_NOT_EXISTS,
    };

  try {
    await db.dl_avatar_brand_logo.delete({
      where: { id },
    });

    await db.dl_brand.updateMany({
      where: { logo: existingBrandLogo.url },
      data: { logo: null },
    });

    return {
      success: ACTION_MESSAGES(brandLogosMeta.label.plural).SUCCESS_DELETE,
    };
  } catch (error) {
    console.error("Something went wrong: ", JSON.stringify(error));

    if (error instanceof Prisma.PrismaClientKnownRequestError)
      return { ...prismaError(error, "Name") };

    throw error;
  }
};

export const deleteManyBrandLogos = async (ids: string[]) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: ACTION_MESSAGES().UNAUTHORIZED };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser || user.role !== UserRole.ADMIN)
    return { error: ACTION_MESSAGES().UNAUTHORIZED };

  const existingBrandLogos = await db.dl_avatar_brand_logo.findMany({
    where: {
      id: { in: ids },
    },
  });

  if (!existingBrandLogos)
    return {
      error: ACTION_MESSAGES(brandLogosMeta.label.plural).DOES_NOT_EXISTS,
    };

  try {
    await db.dl_brand.updateMany({
      where: { logo: { in: existingBrandLogos.map((logo) => logo.url) } },
      data: { logo: null },
    });

    await db.dl_avatar_brand_logo.deleteMany({
      where: { id: { in: ids } },
    });

    return {
      success: ACTION_MESSAGES(brandLogosMeta.label.plural).SUCCESS_DELETE,
    };
  } catch (error) {
    console.error("Something went wrong: ", JSON.stringify(error));

    if (error instanceof Prisma.PrismaClientKnownRequestError)
      return { ...prismaError(error, "Name") };

    throw error;
  }
};
