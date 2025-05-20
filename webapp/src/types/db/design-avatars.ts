import { Prisma } from "@prisma/client";

export type DB_DesignAvatar = Prisma.dl_avatar_designGetPayload<{
  include: {
    createdBy: true;
    updatedBy: true;
  };
}>;
