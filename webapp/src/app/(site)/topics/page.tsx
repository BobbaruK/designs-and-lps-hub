import { CustomAlert } from "@/components/custom-alert";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTitle } from "@/components/page-title";
import { loadSearchParams } from "@/components/search-params";
import { ACTION_MESSAGES } from "@/constants/messages";
import { topicsMeta } from "@/constants/page-titles/topics";
import { DataTableTransitionWrapper } from "@/features/topics/components/table/data-table-transition-wrapper";
import { getTopics, getTopicsCount } from "@/features/topics/data/get-topics";
import { breadCrumbsFn } from "@/lib/breadcrumbs";
import { topicsWhere } from "@/lib/filtering/topics";
import { topicsOrderBy } from "@/lib/sorting/topics";
import { capitalizeFirstLetter } from "@/lib/utils";
import { IBreadcrumb } from "@/types/breadcrumb";
import { SearchParams } from "nuqs/server";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: topicsMeta.href,
    label: capitalizeFirstLetter(topicsMeta.label.plural),
  },
];

interface Props {
  searchParams: Promise<SearchParams>;
}

const TopicsPage = async ({ searchParams }: Props) => {
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

  const filters = topicsWhere({
    filters: {
      search,
      from,
      to,
    },
  });

  const orderBy = topicsOrderBy({ sort, sortBy });

  const topics = await getTopics({
    orderBy,
    pageNumber: pageIndex,
    perPage: pageSize,
    where: filters,
  });

  const topicsCount = await getTopicsCount(filters);

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={breadCrumbsFn(BREADCRUMBS)} />
      <PageTitle
        label={capitalizeFirstLetter(topicsMeta.label.plural)}
        addBtnHref={`${topicsMeta.href}/add`}
      />
      {!topics ? (
        <CustomAlert
          title={"Error!"}
          description={ACTION_MESSAGES(topicsMeta.label.plural).CUSTOM_ALERT}
          variant="destructive"
        />
      ) : (
        <DataTableTransitionWrapper
          data={topics}
          dataCount={topicsCount}
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

export default TopicsPage;
