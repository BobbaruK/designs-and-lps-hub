import { CustomAlert } from "@/components/custom-alert";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTitle } from "@/components/page-title";
import { loadSearchParams } from "@/components/search-params";
import { ACTION_MESSAGES } from "@/constants/messages";
import { landingPageTypeMeta } from "@/constants/page-titles/landing-page-type";
import { DataTableTransitionWrapper } from "@/features/landing-page-types/components/table/data-table-transition-wrapper";
import {
  getLandingPageTypes,
  getLandingPageTypesCount,
} from "@/features/landing-page-types/data/get-landing-page-types";
import { breadCrumbsFn } from "@/lib/breadcrumbs";
import { landingPageTypesWhere } from "@/lib/filtering/landing-page-types";
import { landingPageTypesWhereOrderBy } from "@/lib/sorting/landing-page-types";
import { capitalizeFirstLetter } from "@/lib/utils";
import { IBreadcrumb } from "@/types/breadcrumb";
import { SearchParams } from "nuqs/server";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: landingPageTypeMeta.href,
    label: capitalizeFirstLetter(landingPageTypeMeta.label.plural),
  },
];

interface Props {
  searchParams: Promise<SearchParams>;
}

const LandingPageTypesPage = async ({ searchParams }: Props) => {
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

  const filters = landingPageTypesWhere({
    filters: {
      search,
      from,
      to,
    },
  });

  const orderBy = landingPageTypesWhereOrderBy({ sort, sortBy });

  const landingPageTypes = await getLandingPageTypes({
    orderBy,
    pageNumber: pageIndex,
    perPage: pageSize,
    where: filters,
  });
  const landingPageTypesSelected = await getLandingPageTypes({
    where: {
      id: {
        in: selected || [],
      },
    },
    perPage: -1,
    orderBy,
  });
  const landingPageTypesCount = await getLandingPageTypesCount(filters);

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={breadCrumbsFn(BREADCRUMBS)} />
      <PageTitle
        label={capitalizeFirstLetter(landingPageTypeMeta.label.plural)}
        addBtnHref={`${landingPageTypeMeta.href}/add`}
      />
      {!landingPageTypes ? (
        <CustomAlert
          title={"Error!"}
          description={
            ACTION_MESSAGES(landingPageTypeMeta.label.plural).CUSTOM_ALERT
          }
          variant="destructive"
        />
      ) : (
        <DataTableTransitionWrapper
          data={landingPageTypes}
          dataSelected={landingPageTypesSelected || undefined}
          dataCount={landingPageTypesCount}
          columnVisibilityObj={{
            slug: false,
            description: false,
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

export default LandingPageTypesPage;
