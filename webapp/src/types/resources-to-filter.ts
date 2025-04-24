export type ResourceToFilter = {
  [key: string]: string | string[] | boolean | undefined | null;
};

export type SubKey = "slug" | "iso_639_1" | "equals" | "contains";

export interface FilteringOptions {
  id: string;
  slug: string;
  name: string;
}
