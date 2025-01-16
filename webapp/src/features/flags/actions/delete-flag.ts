"use server";

import { getUserById } from "@/features/auth/data";
import { currentUser } from "@/features/auth/lib/auth";
import db from "@/lib/db";

// Centralize messages
const MESSAGES = {
  UNAUTHORIZED: "Unauthorized!",
  FLAG_NOT_FOUND: "Flag not found!",
  SUCCESS: "Flag deleted!",
  ERROR: "Could not delete the flag!",
};

export const deleteFlag = async (id: string) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: MESSAGES.UNAUTHORIZED };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser || user.role !== "ADMIN") return { error: MESSAGES.UNAUTHORIZED };

  const existingFlag = await db.dl_avatar_flag.findUnique({
    where: {
      id,
    },
  });

  if (!existingFlag) return { error: MESSAGES.FLAG_NOT_FOUND };

  try {
    await db.dl_avatar_flag.delete({
      where: { id },
    });

    await db.dl_language.updateMany({
      where: { flag: existingFlag.url },
      data: { flag: null },
    });

    return {
      success: MESSAGES.SUCCESS,
    };
  } catch (error) {
    console.error("Something went wrong: ", JSON.stringify(error));
    return { error: MESSAGES.ERROR };
  }
};
