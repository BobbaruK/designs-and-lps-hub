import { CustomAlert } from "@/components/custom-alert";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTitle } from "@/components/page-title";
import { loadSearchParams } from "@/components/search-params";
import { ACTION_MESSAGES } from "@/constants/messages";
import { brandLogosMeta } from "@/constants/page-titles/brand-logos";
import { DataTableTransitionWrapper } from "@/features/brand-logos/components/table/data-table-transition-wrapper";
import {
  getBrandLogos,
  getBrandLogosCount,
} from "@/features/brand-logos/data/get-brand-logos";
import { breadCrumbsFn } from "@/lib/breadcrumbs";
import { brandLogosWhere } from "@/lib/filtering/brand-logos";
import { brandLogosOrderBy } from "@/lib/sorting/brand-logos";
import { IBreadcrumb } from "@/types/breadcrumb";
import { SearchParams } from "nuqs/server";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    label: "Admin",
  },
  {
    href: brandLogosMeta.href,
    label: brandLogosMeta.label.plural,
  },
];

interface Props {
  searchParams: Promise<SearchParams>;
}

const BrandLogosPage = async ({ searchParams }: Props) => {
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

  const where = brandLogosWhere({
    filters: {
      search,
      from,
      to,
    },
  });

  const orderBy = brandLogosOrderBy({ sort, sortBy });

  const brandLogos = await getBrandLogos({
    orderBy,
    pageNumber: pageIndex,
    perPage: pageSize,
    where,
  });

  const brandLogosSelected = await getBrandLogos({
    where: {
      id: {
        in: selected || [],
      },
    },
    perPage: -1,
    orderBy,
  });
  const brandLogosCount = await getBrandLogosCount(where);

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={breadCrumbsFn(BREADCRUMBS)} />
      <PageTitle
        label={brandLogosMeta.label.plural}
        addBtnHref={`${brandLogosMeta.href}/add`}
      />
      {!brandLogos ? (
        <CustomAlert
          title={"Error!"}
          description={
            ACTION_MESSAGES(brandLogosMeta.label.plural).CUSTOM_ALERT
          }
          variant="destructive"
        />
      ) : (
        <DataTableTransitionWrapper
          data={brandLogos}
          dataSelected={brandLogosSelected || undefined}
          dataCount={brandLogosCount}
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

export default BrandLogosPage;
