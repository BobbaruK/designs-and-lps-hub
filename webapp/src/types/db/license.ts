import { Prisma } from "@prisma/client";

export type DB_License = Prisma.dl_licenseGetPayload<{
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
