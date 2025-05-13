import { Prisma } from "@prisma/client";

export type DB_RegistrationType = Prisma.dl_registration_typeGetPayload<{
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
