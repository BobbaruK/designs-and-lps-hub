import { ResourceToFilter, SubKey } from "@/types/resources-to-filter";
import { Prisma } from "@prisma/client";

export const lpsWhere = ({
  filters: {
    feature,
    brand,
    topic,
    registrationType,
    language,
    license,
    landingPageType,
    isARTS,
    isReadyForTraffic,
    whatsapp,
    operator,
    search,
    from,
    to,
  },
}: {
  filters: {
    feature: string[] | null;
    brand: string[] | null;
    topic: string[] | null;
    registrationType: string[] | null;
    language: string[] | null;
    license: string[] | null;
    landingPageType: string[] | null;
    isARTS: boolean | null;
    isReadyForTraffic: boolean | null;
    whatsapp: boolean | null;
    operator: "AND" | "OR" | null;
    search: string | null;
    from: Date | null;
    to: Date | null;
  };
}): Prisma.dl_landing_pageWhereInput => {
  const resourcesToFilter: ResourceToFilter[] = [
    { features: feature },
    { brand: brand },
    { topic: topic },
    { registrationType: registrationType },
    { language: language },
    { license: license },
    { landingPageType: landingPageType },
  ];

  if (isARTS !== null) {
    resourcesToFilter.push({
      isARTS,
    });
  }

  if (isReadyForTraffic !== null) {
    resourcesToFilter.push({
      isReadyForTraffic,
    });
  }

  if (whatsapp !== null) {
    resourcesToFilter.push({
      whatsapp,
    });
  }

  if (search !== null) {
    resourcesToFilter.push({ name: search });
  }

  if (from !== null) {
    resourcesToFilter.push({ from });
  }

  if (to !== null) {
    resourcesToFilter.push({ to });
  }

  switch (operator) {
    case "AND":
      const prismaWhereAND = buildPrismaFilter("AND", resourcesToFilter);
      return prismaWhereAND;

    case "OR":
      const prismaWhereOR = buildPrismaFilter("OR", resourcesToFilter);
      return prismaWhereOR;

    default:
      const prismaWhereDefault = buildPrismaFilter("AND", resourcesToFilter);
      return prismaWhereDefault;
  }
};

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
    isARTS: { some: false, subKey: "equals" },
    isReadyForTraffic: { some: false, subKey: "equals" },
    whatsapp: { some: false, subKey: "equals" },
    name: { some: false, subKey: "contains" },
    from: { some: false, subKey: "gte" },
    to: { some: false, subKey: "lte" },
  };

  const addFilter = (opts: {
    key: string;
    values: Date | string | string[] | boolean | undefined | null;
    subKey: SubKey;
    some: boolean;
  }) => {
    if (Array.isArray(opts.values) && opts.values.length > 0) {
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
    } else if (opts.subKey === "equals") {
      filters.push({ [opts.key]: { [opts.subKey]: opts.values } });
    } else if (opts.subKey === "contains") {
      filters.push({
        [opts.key]: { [opts.subKey]: opts.values, mode: "insensitive" },
      });
    } else if (opts.subKey === "gte") {
      filters.push({
        createdAt: {
          gte: opts.values instanceof Date ? opts.values : "",
        },
      });
    } else if (opts.subKey === "lte") {
      filters.push({
        createdAt: {
          lte:
            opts.values instanceof Date
              ? new Date(opts.values.getTime() + 999)
              : "",
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
