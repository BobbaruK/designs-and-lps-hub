import { DB_Design } from "./db/design";
import { DB_LandingPage } from "./db/landing-pages";

export type TableRowSelect =
  | {
      type: "landing-page";
      data: DB_LandingPage[] | null;
    }
  | {
      type: "design";
      data: DB_Design[] | null;
    };
