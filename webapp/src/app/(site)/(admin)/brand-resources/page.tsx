import { CustomAlert } from "@/components/custom-alert";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTitle } from "@/components/page-title";
import { loadSearchParams } from "@/components/search-params";
import { ACTION_MESSAGES } from "@/constants/messages";
import { brandResourcesMeta } from "@/constants/page-titles/brand-resources";
import { DataTableTransitionWrapper } from "@/features/brand-resources/components/table/data-table-transition-wrapper";
import {
  getBrandResources,
  getBrandResourcesCount,
} from "@/features/brand-resources/data/get-brand-resources";
import { breadCrumbsFn } from "@/lib/breadcrumbs";
import { brandResourcesWhere } from "@/lib/filtering/brand-resources";
import { brandResourcesOrderBy } from "@/lib/sorting/brand-resources";
import { capitalizeFirstLetter } from "@/lib/utils";
import { IBreadcrumb } from "@/types/breadcrumb";
import { SearchParams } from "nuqs/server";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    label: "Admin",
  },
  {
    href: brandResourcesMeta.href,
    label: capitalizeFirstLetter(brandResourcesMeta.label.plural),
  },
];

interface Props {
  searchParams: Promise<SearchParams>;
}

const BrandResourcesPage = async ({ searchParams }: Props) => {
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

  const where = brandResourcesWhere({
    filters: {
      search,
      from,
      to,
    },
  });

  const orderBy = brandResourcesOrderBy({ sort, sortBy });

  const brandResources = await getBrandResources({
    orderBy,
    pageNumber: pageIndex,
    perPage: pageSize,
    where,
  });
  const brandResourcesSelected = await getBrandResources({
    where: {
      id: {
        in: selected || [],
      },
    },
    perPage: -1,
    orderBy,
  });
  const brandResourcesCount = await getBrandResourcesCount(where);

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={breadCrumbsFn(BREADCRUMBS)} />
      <PageTitle
        label={capitalizeFirstLetter(brandResourcesMeta.label.plural)}
        addBtnHref={`${brandResourcesMeta.href}/add`}
      />
      {!brandResources ? (
        <CustomAlert
          title={"Error!"}
          description={
            ACTION_MESSAGES(brandResourcesMeta.label.plural).CUSTOM_ALERT
          }
          variant="destructive"
        />
      ) : (
        <DataTableTransitionWrapper
          data={brandResources}
          dataSelected={brandResourcesSelected || undefined}
          dataCount={brandResourcesCount}
          columnVisibilityObj={{
            createdAt: false,
            createdBy: false,
            updatedAt: false,
            updatedBy: false,
          }}
          showResetAll={from || to ? true : false}
        />
      )}
    </PageStructure>
  );
};

export default BrandResourcesPage;
