import { Prisma } from "@prisma/client";

export type DB_Language = Prisma.dl_languageGetPayload<{
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
