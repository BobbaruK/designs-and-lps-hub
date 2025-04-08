import { FilteringOptions } from "../resources-to-filter";

export interface Resource {
  name: string;
  data: FilteringOptions[] | null;
  variant: "text" | "multiSelect" | "range" | "dateRange";
  mn?: boolean; // many to many relationship
}
