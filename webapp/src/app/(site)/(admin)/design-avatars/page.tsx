import { CustomAlert } from "@/components/custom-alert";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTitle } from "@/components/page-title";
import { loadSearchParams } from "@/components/search-params";
import { ACTION_MESSAGES } from "@/constants/messages";
import { designAvatarsMeta } from "@/constants/page-titles/design-avatars";
import { DataTableTransitionWrapper } from "@/features/design-avatars/components/table/data-table-transition-wrapper";
import {
  getDesignAvatars,
  getDesignAvatarsCount,
} from "@/features/design-avatars/data/get-design-avatars";
import { breadCrumbsFn } from "@/lib/breadcrumbs";
import { designAvatarsWhere } from "@/lib/filtering/design-avatars";
import { designAvatarsOrderBy } from "@/lib/sorting/design-avatars";
import { IBreadcrumb } from "@/types/breadcrumb";
import { SearchParams } from "nuqs";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    label: "Admin",
  },
  {
    href: designAvatarsMeta.href,
    label: designAvatarsMeta.label.plural,
  },
];

interface Props {
  searchParams: Promise<SearchParams>;
}

const DesignAvatarsPage = async ({ searchParams }: Props) => {
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

  const where = designAvatarsWhere({
    filters: {
      search,
      from,
      to,
    },
  });

  const orderBy = designAvatarsOrderBy({ sort, sortBy });

  const designAvatars = await getDesignAvatars({
    orderBy,
    pageNumber: pageIndex,
    perPage: pageSize,
    where,
  });
  const designAvatarsSelected = await getDesignAvatars({
    where: {
      id: {
        in: selected || [],
      },
    },
    perPage: -1,
    orderBy,
  });
  const designAvatarsCount = await getDesignAvatarsCount(where);

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={breadCrumbsFn(BREADCRUMBS)} />
      <PageTitle
        label={designAvatarsMeta.label.plural}
        addBtnHref={`${designAvatarsMeta.href}/add`}
      />
      {!designAvatars ? (
        <CustomAlert
          title={"Error!"}
          description={
            ACTION_MESSAGES(designAvatarsMeta.label.plural).CUSTOM_ALERT
          }
          variant="destructive"
        />
      ) : (
        <DataTableTransitionWrapper
          data={designAvatars}
          dataSelected={designAvatarsSelected || undefined}
          dataCount={designAvatarsCount}
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

export default DesignAvatarsPage;
