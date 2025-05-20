import { Prisma } from "@prisma/client";

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
          avatars: true;
        };
      };
    };
  }>;

export type LandingPagesWaitingForTrafficArr =
  | LandingPagesAddedWaitingForTraffic[]
  | null;
