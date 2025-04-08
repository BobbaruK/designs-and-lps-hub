export type ResourceToFilter = {
  [key: string]: string[];
};

export type SubKey = "slug" | "iso_639_1";

export interface FilteringOptions {
  id: string;
  slug: string;
  name: string;
}
