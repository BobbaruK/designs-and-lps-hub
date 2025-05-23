"use server";

import { ACTION_MESSAGES } from "@/constants/messages";
import { landingPagesMeta } from "@/constants/page-titles/landing-pages";
import { getUserById } from "@/features/auth/data/user";
import { currentUser } from "@/features/auth/lib/auth";
import db from "@/lib/db";
import { prismaError } from "@/lib/utils";
import { Update_LPs } from "@/types/db/landing-pages";
import { Prisma, UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { LandingPageSchema } from "../schemas/landing-page-schema";

export const editLandingPage = async (
  values: z.infer<typeof LandingPageSchema>,
  lpId: string,
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
    avatar,
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

  try {
    await db.dl_landing_page.update({
      where: {
        id: lpId,
      },
      data: {
        name,
        slug,
        avatarId: avatar || null,
        url,
        brandId: brand || null,
        designId: design || null,
        features: {
          set: features.map((feature) => ({ id: feature.value })),
        },
        registrationTypeId: registrationType || null,
        landingPageTypeId: landingPageType || null,
        languageId: language || null,
        licenseId: license || null,
        requesterId: requester || null,
        topicId: topic || null,
        whatsapp: whatsapp,
        isARTS,
        isReadyForTraffic,
        isUnderMaintenance,
        isHome,
        updateUserId: dbUser.id || null,
      },
    });

    return {
      success: ACTION_MESSAGES(landingPagesMeta.label.singular).SUCCESS_UPDATE,
      lpSlug: slug,
    };
  } catch (error) {
    console.error("Something went wrong: ", JSON.stringify(error));

    if (error instanceof Prisma.PrismaClientKnownRequestError)
      return { ...prismaError(error, "Name, Slug and/or URL") };

    throw error;
  }
};

export const editManyLandingPages = async (
  values: Update_LPs,
  lpIds: string[],
) => {
  const user = await currentUser();

  const { isARTS, isReadyForTraffic, isUnderMaintenance, whatsapp } = values;

  if (!user || !user.id) {
    return { error: ACTION_MESSAGES().UNAUTHORIZED };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser || user.role === UserRole.USER)
    return { error: ACTION_MESSAGES().UNAUTHORIZED };

  try {
    await db.dl_landing_page.updateMany({
      where: {
        id: { in: lpIds },
      },
      data: {
        isARTS,
        isReadyForTraffic,
        isUnderMaintenance,
        whatsapp,
        updateUserId: dbUser.id || null,
      },
    });

    revalidatePath("/");

    return {
      success: ACTION_MESSAGES(landingPagesMeta.label.plural).SUCCESS_UPDATE,
    };
  } catch (error) {
    revalidatePath("/");

    console.error("Something went wrong: ", JSON.stringify(error));

    if (error instanceof Prisma.PrismaClientKnownRequestError)
      return { ...prismaError(error, "Name, Slug and/or URL") };

    throw error;
  }
};
