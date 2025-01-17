"use server";

import { getUserById } from "@/features/auth/data";
import { currentUser } from "@/features/auth/lib/auth";
import db from "@/lib/db";
import { z } from "zod";
import { DesignAvatarSchema } from "../schemas/design-avatar-schema";

const MESSAGES = {
  INVALID_FIELDS: "Invalid fields!",
  UNAUTHORIZED: "Unauthorized!",
  DESIGN_AVATAR_ADDED: "Design Avatar added!",
  COULD_NOT_ADD: "Could not add the Design Avatar!",
};

export const addDesignAvatar = async (values: z.infer<typeof DesignAvatarSchema>) => {
  const user = await currentUser();

  const validatedFields = DesignAvatarSchema.safeParse(values);

  if (!validatedFields.success) return { error: MESSAGES.INVALID_FIELDS };

  const { name, url } = validatedFields.data;

  if (!user || !user.id) {
    return { error: MESSAGES.UNAUTHORIZED };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser || (user.role !== "ADMIN" && user.role !== "EDITOR"))
    return { error: MESSAGES.UNAUTHORIZED };

  const userAdding = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });

  try {
    await db.dl_avatar_design.create({
      data: {
        name,
        url,
        createdUserId: userAdding?.id,
        updateUserId: userAdding?.id,
      },
    });

    return {
      success: MESSAGES.DESIGN_AVATAR_ADDED,
    };
  } catch (error) {
    console.error("Something went wrong: ", JSON.stringify(error));
    return { error: MESSAGES.COULD_NOT_ADD };
  }
};
