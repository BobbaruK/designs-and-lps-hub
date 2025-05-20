import { CustomAlert } from "@/components/custom-alert";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTitle } from "@/components/page-title";
import { loadSearchParams } from "@/components/search-params";
import { ACTION_MESSAGES } from "@/constants/messages";
import { flagsMeta } from "@/constants/page-titles/flags";
import { DataTableTransitionWrapper } from "@/features/flags/components/table/data-table-transition-wrapper";
import { getFlags, getFlagsCount } from "@/features/flags/data/get-flags";
import { breadCrumbsFn } from "@/lib/breadcrumbs";
import { flagsWhere } from "@/lib/filtering/flags";
import { flagsOrderBy } from "@/lib/sorting/flags";
import { IBreadcrumb } from "@/types/breadcrumb";
import { SearchParams } from "nuqs/server";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    label: "Admin",
  },
  {
    href: flagsMeta.href,
    label: flagsMeta.label.plural,
  },
];

interface Props {
  searchParams: Promise<SearchParams>;
}

const FlagsPage = async ({ searchParams }: Props) => {
  const {
    // Filters
    from,
    to,
    // Pagination
    pageIndex,
    pageSize,
    // Sorting
    sortBy,
    sort,
    // Search
    search,
    // Select LPs
    selected,
  } = await loadSearchParams(searchParams);

  const where = flagsWhere({
    filters: {
      search,
      from,
      to,
    },
  });

  const orderBy = flagsOrderBy({ sort, sortBy });

  const flags = await getFlags({
    orderBy,
    pageNumber: pageIndex,
    perPage: pageSize,
    where,
  });
  const flagsSelected = await getFlags({
    where: {
      id: {
        in: selected || [],
      },
    },
    perPage: -1,
    orderBy,
  });
  const flagsCount = await getFlagsCount(where);

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={breadCrumbsFn(BREADCRUMBS)} />
      <PageTitle
        label={flagsMeta.label.plural}
        addBtnHref={`${flagsMeta.href}/add`}
      />
      {!flags ? (
        <CustomAlert
          title={"Error!"}
          description={ACTION_MESSAGES(flagsMeta.label.plural).CUSTOM_ALERT}
          variant="destructive"
        />
      ) : (
        <DataTableTransitionWrapper
          data={flags}
          dataSelected={flagsSelected || undefined}
          dataCount={flagsCount}
          columnVisibilityObj={{
            updatedAt: false,
            updatedBy: false,
          }}
          showResetAll={from || to ? true : false}
        />
      )}
    </PageStructure>
  );
};

export default FlagsPage;
