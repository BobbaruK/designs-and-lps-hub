import { CustomAlert } from "@/components/custom-alert";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTitle } from "@/components/page-title";
import { loadSearchParams } from "@/components/search-params";
import { ACTION_MESSAGES } from "@/constants/messages";
import { designsMeta } from "@/constants/page-titles/designs";
import { DataTableTransitionWrapper } from "@/features/designs/components/table/data-table-transition-wrapper";
import {
  getDesigns,
  getDesignsCount,
} from "@/features/designs/data/get-designs";
import { breadCrumbsFn } from "@/lib/breadcrumbs";
import { designsWhere } from "@/lib/filtering/designs";
import { designsOrderBy } from "@/lib/sorting/designs-orderby";
import { capitalizeFirstLetter } from "@/lib/utils";
import { IBreadcrumb } from "@/types/breadcrumb";
import { SearchParams } from "nuqs/server";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: designsMeta.href,
    label: capitalizeFirstLetter(designsMeta.label.plural),
  },
];

interface Props {
  searchParams: Promise<SearchParams>;
}

const DesignsPage = async ({ searchParams }: Props) => {
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
  } = await loadSearchParams(searchParams);

  const designsFilters = designsWhere({
    filters: {
      search,
      from,
      to,
    },
  });

  const orderBy = designsOrderBy({ sort, sortBy });

  const designs = await getDesigns({
    orderBy,
    pageNumber: pageIndex,
    perPage: pageSize,
    where: designsFilters,
  });

  const designsCount = await getDesignsCount(designsFilters);

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={breadCrumbsFn(BREADCRUMBS)} />
      <PageTitle
        label={capitalizeFirstLetter(designsMeta.label.plural)}
        addBtnHref={`${designsMeta.href}/add`}
      />
      {!designs ? (
        <CustomAlert
          title={"Error!"}
          description={ACTION_MESSAGES(designsMeta.label.plural).CUSTOM_ALERT}
          variant="destructive"
        />
      ) : (
        <DataTableTransitionWrapper
          data={designs}
          dataCount={designsCount}
          columnVisibilityObj={{
            slug: false,
            // createdAt: false,
            createdBy: false,
            // updatedAt: false,
            updatedBy: false,
          }}
          showResetAll={from || to ? true : false}
        />
      )}
    </PageStructure>
  );
};

export default DesignsPage;
