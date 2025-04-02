import { Prisma } from "@prisma/client";

export type SelectMinimal = {
  id: true;
  slug: true;
  name: true;
};

export type Feature = Prisma.dl_featuresGetPayload<{
  select: SelectMinimal;
}>;

export type Topic = Prisma.dl_topicGetPayload<{
  select: SelectMinimal;
}>;

export type License = Prisma.dl_licenseGetPayload<{
  select: SelectMinimal;
}>;

export type LandingPageType = Prisma.dl_landing_page_typeGetPayload<{
  select: SelectMinimal;
}>;
