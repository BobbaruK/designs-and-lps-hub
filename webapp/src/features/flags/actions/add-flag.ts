"use server";

import { getUserById } from "@/features/auth/data";
import { currentUser } from "@/features/auth/lib/auth";
import db from "@/lib/db";
import { z } from "zod";
import { FlagsSchema } from "../schemas/flags-schema";

const MESSAGES = {
  INVALID_FIELDS: "Invalid fields!",
  UNAUTHORIZED: "Unauthorized!",
  FLAG_ADDED: "Flag added!",
  COULD_NOT_ADD: "Could not add the flag!",
};

export const addFlag = async (values: z.infer<typeof FlagsSchema>) => {
  const user = await currentUser();

  const validatedFields = FlagsSchema.safeParse(values);

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
    await db.dl_avatar_flag.create({
      data: {
        name,
        url,
        createdUserId: userAdding?.id,
        updateUserId: userAdding?.id,
      },
    });

    return {
      success: MESSAGES.FLAG_ADDED,
    };
  } catch (error) {
    console.error("Something went wrong: ", JSON.stringify(error));
    return { error: MESSAGES.COULD_NOT_ADD };
  }
};
