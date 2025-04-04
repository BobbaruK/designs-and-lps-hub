import { ResourceToFilter, SubKey } from "@/types/resources-to-filter";
import { Prisma } from "@prisma/client";

export const buildPrismaFilter = (
  operator: "AND" | "OR" = "AND",
  resourcesArr: ResourceToFilter[],
) => {
  const filters: Prisma.dl_landing_pageWhereInput[] = [];

  const filterMeta: Record<string, { some: boolean; subKey: SubKey }> = {
    features: { some: true, subKey: "slug" },
    topic: { some: false, subKey: "slug" },
    brand: { some: false, subKey: "slug" },
    registrationType: { some: false, subKey: "slug" },
    language: { some: false, subKey: "iso_639_1" },
    license: { some: false, subKey: "slug" },
    landingPageType: { some: false, subKey: "slug" },
  };

  const addFilter = (opts: {
    key: string;
    values: string[];
    subKey: SubKey;
    some: boolean;
  }) => {
    if (opts.values.length > 0) {
      filters.push({
        [opts.key]: {
          ...(opts.some
            ? {
                some: {
                  [opts.subKey]: {
                    in: opts.values,
                  },
                },
              }
            : {
                [opts.subKey]: {
                  in: opts.values,
                },
              }),
        },
      });
    }
  };

  for (const resource of resourcesArr) {
    const key = Object.keys(resource)[0];
    const values = resource[key];
    const meta = filterMeta[key];

    if (!meta) continue; // skip unknown keys

    addFilter({
      key,
      values,
      some: meta.some,
      subKey: meta.subKey,
    });
  }

  return filters.length > 0 ? { [operator]: filters } : {};
};
