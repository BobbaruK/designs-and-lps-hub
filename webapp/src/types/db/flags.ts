import { Prisma } from "@prisma/client";

export type DB_Flags = Prisma.dl_avatar_flagGetPayload<{
  include: {
    createdBy: true;
    updatedBy: true;
  };
}>;
