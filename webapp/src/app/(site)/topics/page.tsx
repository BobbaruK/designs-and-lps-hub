import { CustomAlert } from "@/components/custom-alert";
import { DataTable } from "@/components/data-table";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { ACTION_MESSAGES } from "@/constants/messages";
import { topicsMeta } from "@/constants/page-titles/topics";
import { columns } from "@/features/topics/components/table/columns";
import { getTopics } from "@/features/topics/data/get-topics";
import { breadCrumbsFn } from "@/lib/breadcrumbs";
import { capitalizeFirstLetter } from "@/lib/utils";
import { IBreadcrumb } from "@/types/breadcrumb";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: topicsMeta.href,
    label: capitalizeFirstLetter(topicsMeta.label.plural),
  },
];

const TopicsPage = async () => {
  const topics = await getTopics();

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={breadCrumbsFn(BREADCRUMBS)} />
      <PageTtle
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
        <DataTable
          columns={columns}
          data={topics}
          columnVisibilityObj={{
            slug: false,
            description: false,
            // createdAt: false,
            // createdBy: false,
            updatedAt: false,
            updatedBy: false,
          }}
        />
      )}
    </PageStructure>
  );
};

export default TopicsPage;
