"use server";

import { getUserById } from "@/features/auth/data";
import { currentUser } from "@/features/auth/lib/auth";
import db from "@/lib/db";
import { z } from "zod";
import { DesignAvatarSchema } from "../schemas/design-avatar-schema";

const MESSAGES = {
  UNAUTHORIZED: "Unauthorized!",
  INVALID_FIELDS: "Invalid fields!",
  USER_DOES_NOT_EXIST: "User does not exists!",
  DESIGN_AVATAR_UPDATED: "Design Avatar updated!",
  COULD_NOT_UPDATE: "Could not update the design avatar!",
};

export const editDesignAvatar = async (
  values: z.infer<typeof DesignAvatarSchema>,
  id: string,
) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: MESSAGES.UNAUTHORIZED };
  }

  const validatedFields = DesignAvatarSchema.safeParse(values);

  if (!validatedFields.success) return { error: MESSAGES.INVALID_FIELDS };

  const { name, url } = validatedFields.data;

  const dbUser = await getUserById(user.id);

  if (!dbUser || user.role !== "ADMIN") return { error: MESSAGES.UNAUTHORIZED };

  const editedUser = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!editedUser) {
    return { error: MESSAGES.USER_DOES_NOT_EXIST };
  }

  try {
    await db.dl_avatar_design.update({
      where: {
        id,
      },
      data: { name, url, updateUserId: editedUser.id },
    });

    return {
      success: MESSAGES.DESIGN_AVATAR_UPDATED,
    };
  } catch (error) {
    console.error("Something went wrong: ", JSON.stringify(error));
    return { error: MESSAGES.COULD_NOT_UPDATE };
  }
};
