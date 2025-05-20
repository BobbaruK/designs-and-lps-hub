import { CustomAlert } from "@/components/custom-alert";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTitle } from "@/components/page-title";
import { loadSearchParams } from "@/components/search-params";
import { ACTION_MESSAGES } from "@/constants/messages";
import { userAvatarMeta } from "@/constants/page-titles/user-avatars";
import { DataTableTransitionWrapper } from "@/features/user-avatars/components/table/data-table-transition-wrapper";
import {
  getUserAvatars,
  getUserAvatarsCount,
} from "@/features/user-avatars/data/get-user-avatars";
import { breadCrumbsFn } from "@/lib/breadcrumbs";
import { userAvatarWhere } from "@/lib/filtering/users-avatars";
import { userAvatarOrderBy } from "@/lib/sorting/user-avatars";
import { IBreadcrumb } from "@/types/breadcrumb";
import { SearchParams } from "nuqs/server";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    label: "Admin",
  },
  {
    href: userAvatarMeta.href,
    label: userAvatarMeta.label.plural,
  },
];

interface Props {
  searchParams: Promise<SearchParams>;
}

const UserAvatarsPage = async ({ searchParams }: Props) => {
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

  const where = userAvatarWhere({
    filters: {
      search,
      from,
      to,
    },
  });

  const orderBy = userAvatarOrderBy({ sort, sortBy });

  const userAvatars = await getUserAvatars({
    orderBy,
    pageNumber: pageIndex,
    perPage: pageSize,
    where,
  });
  const userAvatarsSelected = await getUserAvatars({
    where: {
      id: {
        in: selected || [],
      },
    },
    perPage: -1,
    orderBy,
  });
  const userAvatarsCount = await getUserAvatarsCount(where);

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={breadCrumbsFn(BREADCRUMBS)} />
      <PageTitle
        label={userAvatarMeta.label.plural}
        addBtnHref={`${userAvatarMeta.href}/add`}
      />
      {!userAvatars ? (
        <CustomAlert
          title={"Error!"}
          description={
            ACTION_MESSAGES(userAvatarMeta.label.plural).CUSTOM_ALERT
          }
          variant="destructive"
        />
      ) : (
        <DataTableTransitionWrapper
          data={userAvatars}
          dataSelected={userAvatarsSelected || undefined}
          dataCount={userAvatarsCount}
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

export default UserAvatarsPage;
