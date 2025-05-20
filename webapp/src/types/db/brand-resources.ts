import { Prisma } from "@prisma/client";

export type DB_BrandResource = Prisma.dl_brand_resourceGetPayload<{
  include: {
    createdBy: true;
    updatedBy: true;
    brand: {
      select: {
        id: true;
        name: true;
        slug: true;
        logo: true;
      };
    };
  };
}>;
