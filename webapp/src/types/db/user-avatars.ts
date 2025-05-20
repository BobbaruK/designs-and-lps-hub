import { Prisma } from "@prisma/client";

export type DB_UserAvatars = Prisma.dl_avatar_userGetPayload<{
  include: {
    createdBy: true;
    updatedBy: true;
  };
}>;
