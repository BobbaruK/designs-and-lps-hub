import { CustomAlert } from "@/components/custom-alert";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTitle } from "@/components/page-title";
import { loadSearchParams } from "@/components/search-params";
import { ACTION_MESSAGES } from "@/constants/messages";
import { registrationTypesMeta } from "@/constants/page-titles/registration-types";
import { DataTableTransitionWrapper } from "@/features/registration-types/components/table/data-table-transition-wrapper";
import {
  getRegistrationTypes,
  getRegistrationTypesCount,
} from "@/features/registration-types/data/get-registration-types";
import { breadCrumbsFn } from "@/lib/breadcrumbs";
import { registrationTypesWhere } from "@/lib/filtering/registration-types";
import { registrationTypesOrderBy } from "@/lib/sorting/registration-types";
import { capitalizeFirstLetter } from "@/lib/utils";
import { IBreadcrumb } from "@/types/breadcrumb";
import { SearchParams } from "nuqs/server";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: registrationTypesMeta.href,
    label: capitalizeFirstLetter(registrationTypesMeta.label.plural),
  },
];

interface Props {
  searchParams: Promise<SearchParams>;
}

const RegistrationTypesPage = async ({ searchParams }: Props) => {
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

  const registrationTypeFilters = registrationTypesWhere({
    filters: {
      search,
      from,
      to,
    },
  });

  const orderBy = registrationTypesOrderBy({ sort, sortBy });

  const registrationTypes = await getRegistrationTypes({
    orderBy,
    pageNumber: pageIndex,
    perPage: pageSize,
    where: registrationTypeFilters,
  });
  const registrationTypesSelected = await getRegistrationTypes({
    where: {
      id: {
        in: selected || [],
      },
    },
    perPage: -1,
    orderBy,
  });
  const registrationTypesCount = await getRegistrationTypesCount(
    registrationTypeFilters,
  );

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={breadCrumbsFn(BREADCRUMBS)} />
      <PageTitle
        label={capitalizeFirstLetter(registrationTypesMeta.label.plural)}
        addBtnHref={`${registrationTypesMeta.href}/add`}
      />
      {!registrationTypes ? (
        <CustomAlert
          title={"Error!"}
          description={
            ACTION_MESSAGES(registrationTypesMeta.label.plural).CUSTOM_ALERT
          }
          variant="destructive"
        />
      ) : (
        <DataTableTransitionWrapper
          data={registrationTypes}
          dataSelected={registrationTypesSelected || undefined}
          dataCount={registrationTypesCount}
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

export default RegistrationTypesPage;
