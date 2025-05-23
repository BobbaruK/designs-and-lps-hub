import { DB_BrandLogos } from "./db/brand-logos";
import { DB_BrandResource } from "./db/brand-resources";
import { DB_Brand } from "./db/brands";
import { DB_Design } from "./db/design";
import { DB_DesignAvatar } from "./db/design-avatars";
import { DB_FeaturesType } from "./db/features";
import { DB_Flags } from "./db/flags";
import { DB_LandingPageType } from "./db/landing-page-types";
import { DB_LandingPage } from "./db/landing-pages";
import { DB_Language } from "./db/languages";
import { DB_License } from "./db/license";
import { DB_RegistrationType } from "./db/registration-type";
import { DB_Topic } from "./db/topics";
import { DB_UserAvatars } from "./db/user-avatars";
import { DB_User } from "./db/users";

export type TableRowSelect =
  | {
      type: "landing-page";
      data: DB_LandingPage[] | null;
    }
  | {
      type: "design";
      data: DB_Design[] | null;
    }
  | {
      type: "features";
      data: DB_FeaturesType[] | null;
    }
  | {
      type: "brands";
      data: DB_Brand[] | null;
    }
  | {
      type: "registration-type";
      data: DB_RegistrationType[] | null;
    }
  | {
      type: "languages";
      data: DB_Language[] | null;
    }
  | {
      type: "licenses";
      data: DB_License[] | null;
    }
  | {
      type: "topics";
      data: DB_Topic[] | null;
    }
  | {
      type: "landing-page-type";
      data: DB_LandingPageType[] | null;
    }
  | {
      type: "users";
      data: DB_User[] | null;
    }
  | {
      type: "user-avatars";
      data: DB_UserAvatars[] | null;
    }
  | {
      type: "flags";
      data: DB_Flags[] | null;
    }
  | {
      type: "brand-logos";
      data: DB_BrandLogos[] | null;
    }
  | {
      type: "brand-resources";
      data: DB_BrandResource[] | null;
    }
  | {
      type: "design-avatars";
      data: DB_DesignAvatar[] | null;
    };
