import { Prisma } from "@prisma/client";

export type DB_User = Prisma.UserGetPayload<{
  omit: {
    password: true;
  };
  include: {
    accounts: {
      omit: {
        refresh_token: true;
        access_token: true;
        token_type: true;
        id_token: true;
        session_state: true;
        providerAccountId: true;
        expires_at: true;
        scope: true;
      };
    };
    registrationTypeCreated: false;
    registrationTypeUpdated: false;
  };
}>;
