import { CustomAlert } from "@/components/custom-alert";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTitle } from "@/components/page-title";
import { loadSearchParams } from "@/components/search-params";
import { ACTION_MESSAGES } from "@/constants/messages";
import { licensesMeta } from "@/constants/page-titles/licenses";
import { DataTableTransitionWrapper } from "@/features/licenses/components/table/data-table-transition-wrapper";
import {
  getLicenses,
  getLicensesCount,
} from "@/features/licenses/data/get-licenses";
import { breadCrumbsFn } from "@/lib/breadcrumbs";
import { licensesWhere } from "@/lib/filtering/licenses";
import { licensesOrderBy } from "@/lib/sorting/licenses";
import { capitalizeFirstLetter } from "@/lib/utils";
import { IBreadcrumb } from "@/types/breadcrumb";
import { SearchParams } from "nuqs/server";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: licensesMeta.href,
    label: capitalizeFirstLetter(licensesMeta.label.plural),
  },
];

interface Props {
  searchParams: Promise<SearchParams>;
}

const LicensesPage = async ({ searchParams }: Props) => {
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

  const filters = licensesWhere({
    filters: {
      search,
      from,
      to,
    },
  });

  const orderBy = licensesOrderBy({ sort, sortBy });

  const licenses = await getLicenses({
    orderBy,
    pageNumber: pageIndex,
    perPage: pageSize,
    where: filters,
  });
  const licensesSelected = await getLicenses({
    where: {
      id: {
        in: selected || [],
      },
    },
    perPage: -1,
    orderBy,
  });
  const licensesCount = await getLicensesCount(filters);

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={breadCrumbsFn(BREADCRUMBS)} />
      <PageTitle
        label={capitalizeFirstLetter(licensesMeta.label.plural)}
        addBtnHref={`${licensesMeta.href}/add`}
      />
      {!licenses ? (
        <CustomAlert
          title={"Error!"}
          description={ACTION_MESSAGES(licensesMeta.label.plural).CUSTOM_ALERT}
          variant="destructive"
        />
      ) : (
        <DataTableTransitionWrapper
          data={licenses}
          dataSelected={licensesSelected || undefined}
          dataCount={licensesCount}
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

export default LicensesPage;
