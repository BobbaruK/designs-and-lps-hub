"use server";

import { getUserById } from "@/features/auth/data";
import { currentUser } from "@/features/auth/lib/auth";
import db from "@/lib/db";

export const deleteUserAvatar = async (id: string) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: "Unauthorized!" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser || user.role !== "ADMIN") return { error: "Unauthorized!" };

  const existingAvatar = await db.dl_avatar_user.findUnique({
    where: {
      id,
    },
  });

  if (!existingAvatar) return { error: "Avatar not found!" };

  await db.user.updateMany({
    where: { image: existingAvatar.url },
    data: { image: null },
  });

  try {
    await db.dl_avatar_user.delete({
      where: { id },
    });

    return {
      success: "User avatar deleted!",
    };
  } catch (error) {
    console.error("Something went wrong: ", JSON.stringify(error));

    return { error: "Could not delete the user avatar!" };
  }
};
