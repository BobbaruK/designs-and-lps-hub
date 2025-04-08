import { Prisma } from "@prisma/client";

// Last lps added
export type LastLandingPagesAdded = Prisma.dl_landing_pageGetPayload<{
  select: {
    id: true;
    slug: true;
    name: true;
    url: true;
    createdBy: {
      select: {
        id: true;
        name: true;
        image: true;
      };
    };
    brand: {
      select: {
        id: true;
        logo: true;
        name: true;
        slug: true;
      };
    };
    design: {
      select: {
        id: true;
        slug: true;
        name: true;
        avatar: true;
      };
    };
    language: {
      select: {
        id: true;
        englishName: true;
        iso_639_1: true;
        flag: true;
      };
    };
    license: {
      select: {
        id: true;
        name: true;
        slug: true;
      };
    };
  };
}>;

export type LastLandingPagesAddedArr = LastLandingPagesAdded[] | null;

// Lps that are waiting for traffic
export type LandingPagesAddedWaitingForTraffic =
  Prisma.dl_landing_pageGetPayload<{
    select: {
      id: true;
      slug: true;
      name: true;
      url: true;
      isARTS: true;
      isReadyForTraffic: true;
      whatsapp: true;
      createdBy: {
        select: {
          id: true;
          name: true;
          image: true;
        };
      };
      design: {
        select: {
          avatar: true;
        };
      };
    };
  }>;

export type LandingPagesWaitingForTrafficArr =
  | LandingPagesAddedWaitingForTraffic[]
  | null;

// Search params for filtering lps
type Filtering = string | string[] | undefined;
export type SearchParamFeature = Filtering;
export type SearchParamTopic = Filtering;
export type SearchParamBrand = Filtering;
export type SearchParamRegistrationType = Filtering;
export type SearchParamLanguage = Filtering;
export type SearchParamLicense = Filtering;
export type SearchParamLandingPageType = Filtering;
export type SearchParamFOperator = "AND" | "OR" | undefined;

export type LP_SearchParams = {
  feature?: SearchParamFeature;
  topic?: SearchParamTopic;
  brand?: SearchParamBrand;
  registrationType?: SearchParamRegistrationType;
  language?: SearchParamLanguage;
  license?: SearchParamLicense;
  lpType?: SearchParamLandingPageType;
  operator?: SearchParamFOperator;
  isArts?: "true" | "false";
  isReadyForTraffic?: "true" | "false";
  whatsapp?: "true" | "false";
};

export type LP_SearchParamsPromise = Promise<LP_SearchParams>;
