"use server";

import { getUserById } from "@/features/auth/data";
import { currentUser } from "@/features/auth/lib/auth";
import db from "@/lib/db";
import { z } from "zod";
import { UserAvatarSchema } from "../schemas/user-avatar-schema";

export const editUserAvatar = async (
  values: z.infer<typeof UserAvatarSchema>,
  id: string,
) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: "Unauthorized!" };
  }

  const validatedFields = UserAvatarSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { name, url } = validatedFields.data;

  const dbUser = await getUserById(user.id);

  if (!dbUser || user.role !== "ADMIN") return { error: "Unauthorized!" };

  const editedUser = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!editedUser) {
    return { error: "User does not exists!" };
  }

  console.log({ editedUser });

  try {
    await db.dl_avatar_user.update({
      where: {
        id,
      },
      data: { name, url, updateUserId: editedUser.id },
    });

    return {
      success: "User avatar updated!",
    };
  } catch (error) {
    console.error("Something went wrong: ", JSON.stringify(error));

    return { error: "Could not update user avatar!" };
  }
};
