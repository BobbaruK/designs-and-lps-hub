import { Prisma } from "@prisma/client";

export type DB_LandingPage = Prisma.dl_landing_pageGetPayload<{
  include: {
    createdBy: {
      omit: {
        password: true;
      };
    };
    updatedBy: {
      omit: {
        password: true;
      };
    };
    brand: true;
    design: true;
    features: true;
    registrationType: true;
    language: true;
    license: true;
    landingPageType: true;
    requester: {
      omit: {
        password: true;
      };
    };
    topic: true;
  };
}>;
