"use server";

import { ACTION_MESSAGES } from "@/constants/messages";
import { usersMeta } from "@/constants/page-titles/users";
import { currentUser } from "@/features/auth/lib/auth";
import db from "@/lib/db";
import { prismaError } from "@/lib/utils";
import { Prisma, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { getUserById } from "../data/get-user";
import { UserAddSchema } from "../schemas/admin-user";

export const addUser = async (values: z.infer<typeof UserAddSchema>) => {
  const user = await currentUser();

  const validatedFields = UserAddSchema.safeParse(values);

  if (!validatedFields.success)
    return { error: ACTION_MESSAGES().INVALID_FIELDS };

  const { name, password, email, role, isTwoFactorEnabled, image } =
    validatedFields.data;

  if (!user || !user.id) {
    return { error: ACTION_MESSAGES().UNAUTHORIZED };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser || user.role !== UserRole.ADMIN)
    return { error: ACTION_MESSAGES().UNAUTHORIZED };

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        image,
        role,
        isTwoFactorEnabled,
      },
    });

    return { success: ACTION_MESSAGES(usersMeta.label.singular).SUCCESS_ADD };
  } catch (error) {
    console.error("Something went wrong: ", JSON.stringify(error));

    if (error instanceof Prisma.PrismaClientKnownRequestError)
      return { ...prismaError(error, "Email") };

    throw error;
  }
};
