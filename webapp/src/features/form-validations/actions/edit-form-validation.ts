"use server";

import { ACTION_MESSAGES } from "@/constants/messages";
import { formValidationsMeta } from "@/constants/page-titles/form-validations";
import { getUserById } from "@/features/auth/data/user";
import { currentUser } from "@/features/auth/lib/auth";
import db from "@/lib/db";
import { prismaError } from "@/lib/utils";
import { Prisma, UserRole } from "@prisma/client";
import { z } from "zod";
import { FormValidationSchema } from "../schemas/form-validation-schema";

export const editFormValidation = async (
  values: z.infer<typeof FormValidationSchema>,
  id: string,
) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: ACTION_MESSAGES().UNAUTHORIZED };
  }

  const validatedFields = FormValidationSchema.safeParse(values);

  if (!validatedFields.success)
    return { error: ACTION_MESSAGES().INVALID_FIELDS };

  const { name, slug, description } = validatedFields.data;

  const dbUser = await getUserById(user.id);

  if (!dbUser || user.role === UserRole.USER)
    return { error: ACTION_MESSAGES().UNAUTHORIZED };

  try {
    await db.dl_form_validation.update({
      where: {
        id,
      },
      data: {
        name,
        slug,
        description: description || null,
        updateUserId: dbUser.id,
      },
    });

    return {
      success: ACTION_MESSAGES(formValidationsMeta.label.singular)
        .SUCCESS_UPDATE,
    };
  } catch (error) {
    console.error("Something went wrong: ", JSON.stringify(error));

    if (error instanceof Prisma.PrismaClientKnownRequestError)
      return { ...prismaError(error, "Name and/or Slug") };

    throw error;
  }
};
