"use server";

import { getUserById } from "@/features/auth/data";
import { currentUser } from "@/features/auth/lib/auth";
import db from "@/lib/db";
import { z } from "zod";
import { BrandLogosSchema } from "../schemas/brand-logos-schema";

const MESSAGES = {
  INVALID_FIELDS: "Invalid fields!",
  UNAUTHORIZED: "Unauthorized!",
  BRAND_LOGO_ADDED: "Brand Logo added!",
  COULD_NOT_ADD: "Could not add the Brand Logo!",
};

export const addBrandLogo = async (values: z.infer<typeof BrandLogosSchema>) => {
  const user = await currentUser();

  const validatedFields = BrandLogosSchema.safeParse(values);

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
    await db.dl_avatar_brand_logo.create({
      data: {
        name,
        url,
        createdUserId: userAdding?.id,
        updateUserId: userAdding?.id,
      },
    });

    return {
      success: MESSAGES.BRAND_LOGO_ADDED,
    };
  } catch (error) {
    console.error("Something went wrong: ", JSON.stringify(error));
    return { error: MESSAGES.COULD_NOT_ADD };
  }
};
