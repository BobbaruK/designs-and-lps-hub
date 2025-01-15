"use server";

import { getUserById } from "@/features/auth/data";
import { currentUser } from "@/features/auth/lib/auth";
import db from "@/lib/db";
import { z } from "zod";
import { UserAvatarSchema } from "../schemas/user-avatar-schema";

export const addUserAvatar = async (
  values: z.infer<typeof UserAvatarSchema>,
) => {
  const user = await currentUser();

  const validatedFields = UserAvatarSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { name, url } = validatedFields.data;

  if (!user || !user.id) {
    return { error: "Unauthorized!" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser || (user.role !== "ADMIN" && user.role !== "EDITOR"))
    return { error: "Unauthorized!" };

  const userAdding = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });

  try {
    await db.dl_avatar_user.create({
      data: {
        name,
        url,
        createdUserId: userAdding?.id,
        updateUserId: userAdding?.id,
      },
    });

    return {
      success: "User avatar added!",
    };
  } catch (error) {
    console.error("Something went wrong: ", JSON.stringify(error));
    return { error: "Could not add user avatar!" };
  }
};
