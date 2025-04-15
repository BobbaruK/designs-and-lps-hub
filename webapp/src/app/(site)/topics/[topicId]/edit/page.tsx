import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTitle } from "@/components/page-title";
import { topicsMeta } from "@/constants/page-titles/topics";
import { TopicEditForm } from "@/features/topics/components/form/topic-edit";
import { getTopicBySlug } from "@/features/topics/data/get-topic";
import { breadCrumbsFn } from "@/lib/breadcrumbs";
import { redirectUser } from "@/lib/redirect-user";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    topicId: string;
  }>;
}

const EditTopicPage = async ({ params }: Props) => {
  const { topicId } = await params;

  const topicHref = `${topicsMeta.href}/${topicId}`;

  await redirectUser(topicHref);

  const topic = await getTopicBySlug(topicId);

  if (!topic) notFound();

  return (
    <PageStructure>
      <PageBreadcrumbs
        crumbs={breadCrumbsFn([
          {
            href: topicsMeta.href,
            label: topicsMeta.label.plural,
          },
          {
            href: topicHref,
            label: `Edit ${topicsMeta.label.singular.toLowerCase()} "${topic.name}"`,
          },
        ])}
      />
      <PageTitle
        label={`Edit ${topicsMeta.label.singular.toLowerCase()} "${topic.name}"`}
        backBtnHref={topicHref}
      />

      <TopicEditForm topic={topic} />
    </PageStructure>
  );
};

export default EditTopicPage;
