"use server";

import { getUserById } from "@/features/auth/data";
import { currentUser } from "@/features/auth/lib/auth";
import db from "@/lib/db";

// Centralize messages
const MESSAGES = {
  UNAUTHORIZED: "Unauthorized!",
  DESIGN_AVATAR_NOT_FOUND: "Design Avatar not found!",
  SUCCESS: "Design Avatar deleted!",
  ERROR: "Could not delete the Design Avatar!",
};

export const deleteDesignAvatar = async (id: string) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: MESSAGES.UNAUTHORIZED };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser || user.role !== "ADMIN") return { error: MESSAGES.UNAUTHORIZED };

  const existingBrandLogo = await db.dl_avatar_design.findUnique({
    where: {
      id,
    },
  });

  if (!existingBrandLogo) return { error: MESSAGES.DESIGN_AVATAR_NOT_FOUND };

  try {
    await db.dl_avatar_design.delete({
      where: { id },
    });

    await db.dl_design.updateMany({
      where: { avatar: existingBrandLogo.url },
      data: { avatar: null },
    });

    return {
      success: MESSAGES.SUCCESS,
    };
  } catch (error) {
    console.error("Something went wrong: ", JSON.stringify(error));
    return { error: MESSAGES.ERROR };
  }
};
