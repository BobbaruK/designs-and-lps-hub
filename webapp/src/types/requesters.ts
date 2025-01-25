import { Prisma } from "@prisma/client";

export type Requester = Prisma.UserGetPayload<{
  omit: {
    password: true;
  };
  include: {
    _count: {
      select: {
        landingPagesRequested: true;
      };
    };
  };
}>;

export type RequesterArr = Requester[] | null;
