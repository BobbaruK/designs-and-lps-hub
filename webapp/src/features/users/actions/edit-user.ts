"use server";

import { ACTION_MESSAGES } from "@/constants/messages";
import { currentUser } from "@/features/auth/lib/auth";
import { sendVerificationEmail } from "@/features/auth/lib/mail";
import { generateVerificationToken } from "@/features/auth/lib/tokens";
import db from "@/lib/db";
import { prismaError } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { getUserByEmail, getUserById } from "../data/get-user";
import { UserEditSchema } from "../schemas/admin-user";

export const editUser = async (
  values: z.infer<typeof UserEditSchema>,
  id: string,
) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: ACTION_MESSAGES().UNAUTHORIZED };
  }

  const validatedFields = UserEditSchema.safeParse(values);

  if (!validatedFields.success)
    return { error: ACTION_MESSAGES().INVALID_FIELDS };

  const dbUser = await getUserById(user.id!);

  if (!dbUser || user.role !== "ADMIN")
    return { error: ACTION_MESSAGES().UNAUTHORIZED };

  const editedUser = await db.user.findUnique({
    where: {
      id,
    },
    include: {
      accounts: true,
    },
  });

  if (!editedUser) {
    return { error: ACTION_MESSAGES().DOES_NOT_EXISTS };
  }

  if (editedUser.accounts.length) {
    values.email = undefined;
    values.password = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== editedUser.email) {
    const existingUser = await getUserByEmail(values.email);
    console.log({ existingUser });

    if (existingUser) return { error: ACTION_MESSAGES().EMAIL_IN_USE };

    const verificationToken = await generateVerificationToken(
      values.email,
      editedUser.email,
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return {
      success: ACTION_MESSAGES().VERIFICATION_SENT,
    };
  }

  if (values.password && editedUser.password) {
    const passwordMatch = await bcrypt.compare(
      values.password,
      editedUser.password,
    );

    if (passwordMatch) return { error: ACTION_MESSAGES().NOT_OLD_PASS };

    const hashedPassword = await bcrypt.hash(values.password, 10);

    values.password = hashedPassword;
  }

  try {
    await db.user.update({
      where: {
        id,
      },
      data: { ...values },
    });

    return {
      success: ACTION_MESSAGES("User").SUCCESS_UPDATE,
    };
  } catch (error) {
    console.error("Something went wrong: ", JSON.stringify(error));

    if (error instanceof Prisma.PrismaClientKnownRequestError)
      return { ...prismaError(error, "Email") };

    throw error;
  }
};
