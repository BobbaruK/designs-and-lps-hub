"use server";

import { ACTION_MESSAGES } from "@/constants/messages";
import { landingPagesMeta } from "@/constants/page-titles/landing-pages";
import { getUserById } from "@/features/auth/data/user";
import { currentUser } from "@/features/auth/lib/auth";
import db from "@/lib/db";
import { prismaError } from "@/lib/utils";
import { Prisma, UserRole } from "@prisma/client";
import { z } from "zod";
import { LandingPageSchema } from "../schemas/landing-page-schema";

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
    features,
    registrationType,
    isARTS,
    isReadyForTraffic,
    isUnderMaintenance,
    language,
    license,
    requester,
    whatsapp,
    landingPageType,
    isHome,
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
        features: {
          connect: features.map((feature) => ({ id: feature.value })),
        },
        registrationTypeId: registrationType || null,
        landingPageTypeId: landingPageType || null,
        languageId: language || null,
        licenseId: license || null,
        requesterId: requester || null,
        topicId: topic || null,
        whatsapp,
        isARTS,
        isUnderMaintenance,
        isReadyForTraffic: isReadyForTraffic,
        createdUserId: userAdding?.id,
        updateUserId: userAdding?.id,
        isHome,
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
