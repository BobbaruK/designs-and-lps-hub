"use server";

import { ACTION_MESSAGES } from "@/constants/messages";
import { getUserById } from "@/features/auth/data/user";
import { currentUser } from "@/features/auth/lib/auth";
import db from "@/lib/db";
import { prismaError } from "@/lib/utils";
import { Prisma, UserRole } from "@prisma/client";
import { z } from "zod";
import { LandingPageSchema } from "../schemas/landing-page-schema";
import { landingPagesMeta } from "@/constants/page-titles/landing-pages";

export const addLandingPage = async (
  values: z.infer<typeof LandingPageSchema>,
) => {
  const user = await currentUser();

  const validatedFields = LandingPageSchema.safeParse(values);

  if (!validatedFields.success)
    return { error: ACTION_MESSAGES().INVALID_FIELDS };

  const {
    name,
    slug,
    topic,
    url,
    brand,
    design,
    registrationType,
    isARTS,
    isReadyForTrafic,
    language,
    license,
    requester,
    whatsapp,
    landingPageType,
  } = validatedFields.data;

  if (!user || !user.id) {
    return { error: ACTION_MESSAGES().UNAUTHORIZED };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser || user.role === UserRole.USER)
    return { error: ACTION_MESSAGES().UNAUTHORIZED };

  const userAdding = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });

  try {
    await db.dl_landing_page.create({
      data: {
        name,
        slug,
        url,
        brandId: brand || null,
        designId: design || null,
        registrationTypeId: registrationType || null,
        landingPageTypeId: landingPageType || null,
        languageId: language || null,
        licenseId: license || null,
        requesterId: requester || null,
        topicId: topic || null,
        whatsapp: whatsapp,
        isARTS: isARTS,
        isReadyForTrafic: isReadyForTrafic,
        createdUserId: userAdding?.id,
        updateUserId: userAdding?.id,
      },
    });

    return {
      success: ACTION_MESSAGES(landingPagesMeta.label.singular).SUCCESS_ADD,
    };
  } catch (error) {
    console.error("Something went wrong: ", JSON.stringify(error));

    if (error instanceof Prisma.PrismaClientKnownRequestError)
      return { ...prismaError(error, "Name, Slug and/or URL") };

    throw error;
  }
};
