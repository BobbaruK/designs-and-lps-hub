import { DB_Brand } from "./db/brands";
import { DB_Design } from "./db/design";
import { DB_FeaturesType } from "./db/features";
import { DB_LandingPage } from "./db/landing-pages";
import { DB_Language } from "./db/languages";
import { DB_License } from "./db/license";
import { DB_RegistrationType } from "./db/registration-type";

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
    };
