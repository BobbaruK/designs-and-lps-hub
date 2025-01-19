import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { TopicEditForm } from "@/features/topics/components/form/topic-edit";
import { getTopicBySlug } from "@/features/topics/data/get-topic";
import { IBreadcrumb } from "@/types/breadcrumb";
import { notFound } from "next/navigation";

const BREADCRUMBS = ({ href, label }: IBreadcrumb): IBreadcrumb[] => {
  return [
    {
      href: "/dashboard",
      label: "Home",
    },
    {
      href: "/topics",
      label: "Topics",
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

  const topic = await getTopicBySlug(topicId);

  if (!topic) notFound();

  return (
    <PageStructure>
      <PageBreadcrumbs
        crumbs={BREADCRUMBS({
          href: `/topics/${topic.slug}`,
          label: "Edit " + topic.name,
        })}
      />
      <PageTtle
        label={`Edit "${topic?.name}"`}
        backBtnHref={`/topics/${topic.slug}`}
      />

      <TopicEditForm topic={topic} />
    </PageStructure>
  );
};

export default EditTopicPage;
