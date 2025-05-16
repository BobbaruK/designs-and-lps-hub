import { Prisma } from "@prisma/client";

export type DB_Topic = Prisma.dl_topicGetPayload<{
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
