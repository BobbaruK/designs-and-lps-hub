import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { dashboardMeta } from "@/constants/page-titles/dashboard";
import { topicsMeta } from "@/constants/page-titles/topics";
import { TopicAddForm } from "@/features/topics/components/form/topic-add";
import { redirectUser } from "@/lib/redirect-user";
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
  {
    href: `${topicsMeta.href}/add`,
    label: `Add ${topicsMeta.label.singular}`,
  },
];

const AddTopicPage = async () => {
  await redirectUser(topicsMeta.href);

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTtle
        label={`Add ${topicsMeta.label.singular}`}
        backBtnHref={topicsMeta.href}
      />

      <TopicAddForm />
    </PageStructure>
  );
};

export default AddTopicPage;
