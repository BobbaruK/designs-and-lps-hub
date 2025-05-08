import { Prisma } from "@prisma/client";

export type DB_Brand = Prisma.dl_brandGetPayload<{
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
