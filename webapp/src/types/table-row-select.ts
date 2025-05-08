import { DB_Brand } from "./db/brands";
import { DB_Design } from "./db/design";
import { DB_FeaturesType } from "./db/features";
import { DB_LandingPage } from "./db/landing-pages";

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
    };
