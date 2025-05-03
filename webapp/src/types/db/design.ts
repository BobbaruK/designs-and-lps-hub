import { Prisma } from "@prisma/client";

export type DB_Design = Prisma.dl_designGetPayload<{
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
