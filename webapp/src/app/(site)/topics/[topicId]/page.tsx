import { DataTable } from "@/components/data-table";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { dashboardMeta } from "@/constants/page-titles/dashboard";
import { topicsMeta } from "@/constants/page-titles/topics";
import { LandingPageLegend } from "@/features/landing-pages/components/landing-page-legend";
import { columns } from "@/features/landing-pages/components/table/landing-page-columns";
import { getTopicBySlug } from "@/features/topics/data/get-topic";
import { capitalizeFirstLetter } from "@/lib/utils";
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
      label: capitalizeFirstLetter(topicsMeta.label.plural),
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

  const topicHref = `${topicsMeta.href}/${topicId}`;

  const topic = await getTopicBySlug(topicId);

  if (!topic) notFound();

  return (
    <PageStructure>
      <PageBreadcrumbs
        crumbs={BREADCRUMBS({
          href: topicHref,
          label: topic.name,
        })}
      />
      <PageTtle
        label={topic.name}
        backBtnHref={topicsMeta.href}
        editBtnHref={`${topicHref}/edit`}
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
          legendItems={<LandingPageLegend />}
        />
      </section>
    </PageStructure>
  );
};

export default TopicPage;
