import { CustomAlert } from "@/components/custom-alert";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTitle } from "@/components/page-title";
import { loadSearchParams } from "@/components/search-params";
import { ACTION_MESSAGES } from "@/constants/messages";
import { featuresTypeMeta } from "@/constants/page-titles/features";
import { DataTableTransitionWrapper } from "@/features/landing-page-features/components/table/data-table-transition-wrapper";
import {
  getLandingPageFeatures,
  getLandingPageFeaturesCount,
} from "@/features/landing-page-features/data/get-landing-page-features";
import { breadCrumbsFn } from "@/lib/breadcrumbs";
import { featuresWhere } from "@/lib/filtering/features";
import { featuresOrderBy } from "@/lib/sorting/features";
import { capitalizeFirstLetter } from "@/lib/utils";
import { IBreadcrumb } from "@/types/breadcrumb";
import { SearchParams } from "nuqs/server";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: featuresTypeMeta.href,
    label: capitalizeFirstLetter(featuresTypeMeta.label.plural),
  },
];

interface Props {
  searchParams: Promise<SearchParams>;
}

const LandingPageFeaturesPage = async ({ searchParams }: Props) => {
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

  const filters = featuresWhere({
    filters: {
      search,
      from,
      to,
    },
  });

  const orderBy = featuresOrderBy({ sort, sortBy });

  const lpFeatures = await getLandingPageFeatures({
    orderBy,
    pageNumber: pageIndex,
    perPage: pageSize,
    where: filters,
  });
  const lpFeaturesSelected = await getLandingPageFeatures({
    where: {
      id: {
        in: selected || [],
      },
    },
    perPage: -1,
    orderBy,
  });
  const featuresCount = await getLandingPageFeaturesCount(filters);

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={breadCrumbsFn(BREADCRUMBS)} />
      <PageTitle
        label={capitalizeFirstLetter(featuresTypeMeta.label.plural)}
        addBtnHref={`${featuresTypeMeta.href}/add`}
      />
      {!lpFeatures ? (
        <CustomAlert
          title={"Error!"}
          description={
            ACTION_MESSAGES(featuresTypeMeta.label.plural).CUSTOM_ALERT
          }
          variant="destructive"
        />
      ) : (
        <DataTableTransitionWrapper
          data={lpFeatures}
          dataSelected={lpFeaturesSelected || undefined}
          dataCount={featuresCount}
          columnVisibilityObj={{
            slug: false,
            description: false,
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

export default LandingPageFeaturesPage;
