import { CustomAlert } from "@/components/custom-alert";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTitle } from "@/components/page-title";
import { loadSearchParams } from "@/components/search-params";
import { ACTION_MESSAGES } from "@/constants/messages";
import { brandsMeta } from "@/constants/page-titles/brands";
import { DataTableTransitionWrapper } from "@/features/brands/components/table/data-table-transition-wrapper";
import { getBrands, getBrandsCount } from "@/features/brands/data/get-brands";
import { breadCrumbsFn } from "@/lib/breadcrumbs";
import { brandsWhere } from "@/lib/filtering/brands";
import { brandsOrderBy } from "@/lib/sorting/brands";
import { capitalizeFirstLetter } from "@/lib/utils";
import { IBreadcrumb } from "@/types/breadcrumb";
import { SearchParams } from "nuqs/server";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: brandsMeta.href,
    label: capitalizeFirstLetter(brandsMeta.label.plural),
  },
];

interface Props {
  searchParams: Promise<SearchParams>;
}

const BrandsPage = async ({ searchParams }: Props) => {
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

  const brandsFilters = brandsWhere({
    filters: {
      search,
      from,
      to,
    },
  });

  const orderBy = brandsOrderBy({ sort, sortBy });

  const brands = await getBrands({
    orderBy,
    pageNumber: pageIndex,
    perPage: pageSize,
    where: brandsFilters,
  });
  const brandsSelected = await getBrands({
    where: {
      id: {
        in: selected || [],
      },
    },
    perPage: -1,
    orderBy,
  });
  const brandsCount = await getBrandsCount(brandsFilters);

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={breadCrumbsFn(BREADCRUMBS)} />
      <PageTitle
        label={brandsMeta.label.plural}
        addBtnHref={`${brandsMeta.href}/add`}
      />
      {!brands ? (
        <CustomAlert
          title={"Error!"}
          description={ACTION_MESSAGES(brandsMeta.label.plural).CUSTOM_ALERT}
          variant="destructive"
        />
      ) : (
        <DataTableTransitionWrapper
          data={brands}
          dataSelected={brandsSelected || undefined}
          dataCount={brandsCount}
          columnVisibilityObj={{
            slug: false,
            // createdAt: false,
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

export default BrandsPage;
