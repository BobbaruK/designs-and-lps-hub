export type ResourceToFilter = {
  [key: string]: Date | string | string[] | boolean | undefined | null;
};

export type SubKey =
  | "slug"
  | "iso_639_1"
  | "equals"
  | "contains"
  | "gte"
  | "lte"
  | "in";

export interface FilteringOptions {
  id: string;
  slug: string;
  name: string;
}
