import { CustomAlert } from "@/components/custom-alert";
import { DataTable } from "@/components/data-table";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { ACTION_MESSAGES } from "@/constants/messages";
import { dashboardMeta } from "@/constants/page-titles/dashboard";
import { topicsMeta } from "@/constants/page-titles/topics";
import { columns } from "@/features/topics/components/table/colums";
import { getTopics } from "@/features/topics/data/get-topics";
import { IBreadcrumb } from "@/types/breadcrumb";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: dashboardMeta.href,
    label: dashboardMeta.label.singular,
  },
  {
    href: topicsMeta.href,
    label: topicsMeta.label.plural,
  },
];

const TopicsPage = async () => {
  const topics = await getTopics();

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTtle
        label={topicsMeta.label.plural}
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
          }}
        />
      )}
    </PageStructure>
  );
};

export default TopicsPage;
