import { DataTable } from "@/components/data-table";
import { columns } from "@/components/data-table/landing-page-columns";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
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

const TopicPage = async ({ params }: Props) => {
  const { topicId } = await params;

  const topic = await getTopicBySlug(topicId);

  if (!topic) notFound();

  return (
    <PageStructure>
      <PageBreadcrumbs
        crumbs={BREADCRUMBS({
          href: `/topics/${topic.slug}`,
          label: topic.name,
        })}
      />
      <PageTtle
        label={topic?.name}
        backBtnHref="/topics"
        editBtnHref={`/topics/${topic.slug}/edit`}
      />
      <div>
        {topic.description ? (
          <pre className="whitespace-pre-wrap">{topic.description}</pre>
        ) : (
          <p>
            <span className="italic">There is no description added</span>
          </p>
        )}
      </div>

      <section>
        <h2 className="text-heading4">Landing pages</h2>
        <DataTable
          columns={columns}
          data={topic.landingPages}
          columnVisibilityObj={{
            slug: false,
            fxoroFooter: false,
            requester: false,
            topic: false,
            createdAt: false,
            createdBy: false,
            updatedAt: false,
            updatedBy: false,
          }}
        />
      </section>
    </PageStructure>
  );
};

export default TopicPage;
