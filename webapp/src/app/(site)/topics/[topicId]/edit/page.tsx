import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { dashboardMeta } from "@/constants/page-titles/dashboard";
import { topicsMeta } from "@/constants/page-titles/topics";
import { TopicEditForm } from "@/features/topics/components/form/topic-edit";
import { getTopicBySlug } from "@/features/topics/data/get-topic";
import { redirectUser } from "@/lib/redirect-user";
import { IBreadcrumb } from "@/types/breadcrumb";
import { notFound } from "next/navigation";

const BREADCRUMBS = ({ href, label }: IBreadcrumb): IBreadcrumb[] => {
  return [
    {
      href: dashboardMeta.href,
      label: dashboardMeta.label.singular,
    },
    {
      href: topicsMeta.href,
      label: topicsMeta.label.plural,
    },
    {
      href,
      label,
    },
  ];
};

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
        crumbs={BREADCRUMBS({
          href: topicHref,
          label: "Edit " + topic.name,
        })}
      />
      <PageTtle label={`Edit "${topic.name}"`} backBtnHref={topicHref} />

      <TopicEditForm topic={topic} />
    </PageStructure>
  );
};

export default EditTopicPage;
