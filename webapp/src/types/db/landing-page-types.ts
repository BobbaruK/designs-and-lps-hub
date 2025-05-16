import { Prisma } from "@prisma/client";

export type DB_LandingPageType = Prisma.dl_landing_page_typeGetPayload<{
  include: {
    createdBy: true;
    updatedBy: true;
    _count: {
      select: {
        landingPages: true;
      };
    };
  };
}>;
