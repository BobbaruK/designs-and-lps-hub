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
      isReadyForTrafic: true;
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
export type SearchParamFeature = string | string[] | undefined;
export type SearchParamFOperator = "AND" | "OR" | "NOT" | undefined;
export type SearchParamTopic = string | undefined;

export type LP_SearchParamsPromise = Promise<{
  feature?: SearchParamFeature;
  foperator?: SearchParamFOperator;
  topic?: SearchParamTopic;
}>;

export type LP_SearchParams = {
  feature?: SearchParamFeature;
  foperator?: SearchParamFOperator;
  topic?: SearchParamTopic;
};
