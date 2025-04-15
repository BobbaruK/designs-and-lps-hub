import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { topicsMeta } from "@/constants/page-titles/topics";
import { TopicAddForm } from "@/features/topics/components/form/topic-add";
import { breadCrumbsFn } from "@/lib/breadcrumbs";
import { redirectUser } from "@/lib/redirect-user";
import { capitalizeFirstLetter } from "@/lib/utils";
import { IBreadcrumb } from "@/types/breadcrumb";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: topicsMeta.href,
    label: capitalizeFirstLetter(topicsMeta.label.plural),
  },
  {
    href: `${topicsMeta.href}/add`,
    label: `Add ${topicsMeta.label.singular.toLowerCase()}`,
  },
];

const AddTopicPage = async () => {
  await redirectUser(topicsMeta.href);

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={breadCrumbsFn(BREADCRUMBS)} />
      <PageTtle
        label={`Add ${topicsMeta.label.singular.toLowerCase()}`}
        backBtnHref={topicsMeta.href}
      />

      <TopicAddForm />
    </PageStructure>
  );
};

export default AddTopicPage;
