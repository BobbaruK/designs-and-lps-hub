import { ResourceToFilter, SubKey } from "@/types/resources-to-filter";
import { Prisma } from "@prisma/client";

export const userAvatarWhere = ({
  filters: { search, from, to },
}: {
  filters: {
    search: string | null;
    from: Date | null;
    to: Date | null;
  };
}): Prisma.dl_avatar_userWhereInput => {
  const resourcesToFilter: ResourceToFilter[] = [];

  if (search !== null) {
    resourcesToFilter.push({ name: search });
  }

  if (from !== null) {
    resourcesToFilter.push({ from });
  }

  if (to !== null) {
    resourcesToFilter.push({ to });
  }

  const prismaWhereDefault = buildPrismaFilter("AND", resourcesToFilter);
  return prismaWhereDefault;
};

function buildPrismaFilter(
  operator: "AND" | "OR" = "AND",
  resourcesArr: ResourceToFilter[],
) {
  const filters: Prisma.dl_avatar_userWhereInput[] = [];

  const filterMeta: Record<string, { some: boolean; subKey: SubKey }> = {
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
}
