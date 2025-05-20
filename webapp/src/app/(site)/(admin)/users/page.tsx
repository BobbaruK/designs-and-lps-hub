import { CustomAlert } from "@/components/custom-alert";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTitle } from "@/components/page-title";
import { loadSearchParams } from "@/components/search-params";
import { ACTION_MESSAGES } from "@/constants/messages";
import { usersMeta } from "@/constants/page-titles/users";
import { DataTableTransitionWrapper } from "@/features/users/components/table/data-table-transition-wrapper";
import { getUserCount, getUsers } from "@/features/users/data/get-user";
import { breadCrumbsFn } from "@/lib/breadcrumbs";
import { usersWhere } from "@/lib/filtering/users";
import { usersOrderBy } from "@/lib/sorting/users";
import { IBreadcrumb } from "@/types/breadcrumb";
import { SearchParams } from "nuqs/server";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    label: "Admin",
  },
  {
    href: usersMeta.href,
    label: usersMeta.label.plural,
  },
];

interface Props {
  searchParams: Promise<SearchParams>;
}

const UsersPage = async ({ searchParams }: Props) => {
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

  const usersFilters = usersWhere({
    filters: {
      search,
      from,
      to,
    },
  });

  const orderBy = usersOrderBy({ sort, sortBy });

  const users = await getUsers({
    orderBy,
    pageNumber: pageIndex,
    perPage: pageSize,
    where: usersFilters,
  });
  const usersSelected = await getUsers({
    where: {
      id: {
        in: selected || [],
      },
    },
    perPage: -1,
    orderBy,
  });
  const usersCount = await getUserCount(usersFilters);

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={breadCrumbsFn(BREADCRUMBS)} />
      <PageTitle
        label={usersMeta.label.plural}
        addBtnHref={`${usersMeta.href}/add`}
      />
      {!users ? (
        <CustomAlert
          title={"Error!"}
          description={ACTION_MESSAGES(usersMeta.label.plural).CUSTOM_ALERT}
          variant="destructive"
        />
      ) : (
        <>
          <DataTableTransitionWrapper
            data={users}
            dataSelected={usersSelected || undefined}
            dataCount={usersCount}
            columnVisibilityObj={{
              updatedAt: false,
            }}
            showResetAll={from || to ? true : false}
          />
        </>
      )}
    </PageStructure>
  );
};

export default UsersPage;
