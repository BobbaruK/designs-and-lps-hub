import { CustomAlert } from "@/components/custom-alert";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTitle } from "@/components/page-title";
import { loadSearchParams } from "@/components/search-params";
import { ACTION_MESSAGES } from "@/constants/messages";
import { languagesMeta } from "@/constants/page-titles/languages";
import { DataTableTransitionWrapper } from "@/features/languages/components/table/data-table-transition-wrapper";
import {
  getLanguages,
  getLanguagesCount,
} from "@/features/languages/data/get-languages";
import { breadCrumbsFn } from "@/lib/breadcrumbs";
import { languagesWhere } from "@/lib/filtering/languages";
import { languagesOrderBy } from "@/lib/sorting/languages";
import { capitalizeFirstLetter } from "@/lib/utils";
import { IBreadcrumb } from "@/types/breadcrumb";
import { SearchParams } from "nuqs/server";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: languagesMeta.href,
    label: capitalizeFirstLetter(languagesMeta.label.plural),
  },
];

interface Props {
  searchParams: Promise<SearchParams>;
}

const LanguagesPage = async ({ searchParams }: Props) => {
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

  const filters = languagesWhere({
    filters: {
      search,
      from,
      to,
    },
  });

  console.log({ filters });

  const orderBy = languagesOrderBy({ sort, sortBy });

  const languages = await getLanguages({
    orderBy,
    pageNumber: pageIndex,
    perPage: pageSize,
    where: filters,
  });

  const languagesCount = await getLanguagesCount(filters);

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={breadCrumbsFn(BREADCRUMBS)} />
      <PageTitle
        label={capitalizeFirstLetter(languagesMeta.label.plural)}
        addBtnHref={`${languagesMeta.href}/add`}
      />
      {!languages ? (
        <CustomAlert
          title={"Error!"}
          description={ACTION_MESSAGES(languagesMeta.label.plural).CUSTOM_ALERT}
          variant="destructive"
        />
      ) : (
        <DataTableTransitionWrapper
          data={languages}
          dataCount={languagesCount}
          columnVisibilityObj={{
            slug: false,
            name: false,
            iso_639_1: false,
            iso_3166_1: false,
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

export default LanguagesPage;
