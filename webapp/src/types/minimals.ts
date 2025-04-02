import { dl_language, Prisma } from "@prisma/client";

export type SelectMinimal = {
  id: true;
  slug: true;
  name: true;
};

export type FeatureMinimal = Prisma.dl_featuresGetPayload<{
  select: SelectMinimal;
}>;

export type TopicMinimal = Prisma.dl_topicGetPayload<{
  select: SelectMinimal;
}>;

export type LicenseMinimal = Prisma.dl_licenseGetPayload<{
  select: SelectMinimal;
}>;

export type LandingPageTypeMinimal = Prisma.dl_landing_page_typeGetPayload<{
  select: SelectMinimal;
}>;

export type RegistrationTypeMinimal = Prisma.dl_registration_typeGetPayload<{
  select: SelectMinimal;
}>;

export type LanguageMinimal = Prisma.dl_languageGetPayload<{
  select: Omit<SelectMinimal, "slug" | "name"> & {
    iso_639_1: true;
    englishName: true;
  };
}>;

export type BrandMinimal = Prisma.dl_brandGetPayload<{
  select: SelectMinimal;
}>;
