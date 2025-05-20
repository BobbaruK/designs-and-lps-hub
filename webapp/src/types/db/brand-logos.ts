import { Prisma } from "@prisma/client";

export type DB_BrandLogos = Prisma.dl_avatar_brand_logoGetPayload<{
  include: {
    createdBy: true;
    updatedBy: true;
  };
}>;
