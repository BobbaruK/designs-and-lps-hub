"use server";

import { getUserById } from "@/features/auth/data/user";
import { currentUser } from "@/features/auth/lib/auth";
import db from "@/lib/db";

// Centralize messages
const MESSAGES = {
  UNAUTHORIZED: "Unauthorized!",
  BRAND_LOGO_NOT_FOUND: "Brand Logo not found!",
  SUCCESS: "Brand Logo deleted!",
  ERROR: "Could not delete the Brand Logo!",
};

export const deleteBrandLogo = async (id: string) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: MESSAGES.UNAUTHORIZED };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser || user.role !== "ADMIN") return { error: MESSAGES.UNAUTHORIZED };

  const existingBrandLogo = await db.dl_avatar_brand_logo.findUnique({
    where: {
      id,
    },
  });

  if (!existingBrandLogo) return { error: MESSAGES.BRAND_LOGO_NOT_FOUND };

  try {
    await db.dl_avatar_brand_logo.delete({
      where: { id },
    });

    await db.dl_brand.updateMany({
      where: { logo: existingBrandLogo.url },
      data: { logo: null },
    });

    return {
      success: MESSAGES.SUCCESS,
    };
  } catch (error) {
    console.error("Something went wrong: ", JSON.stringify(error));
    return { error: MESSAGES.ERROR };
  }
};
