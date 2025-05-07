import { Prisma } from "@prisma/client";

export type DB_FeaturesType = Prisma.dl_featuresGetPayload<{
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
