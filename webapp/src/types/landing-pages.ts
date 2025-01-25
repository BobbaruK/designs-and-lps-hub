import { Prisma } from "@prisma/client";

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
