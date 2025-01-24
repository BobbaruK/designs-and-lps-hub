import { CustomAvatar } from "@/components/custom-avatar";
import { DataTable } from "@/components/data-table";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { dashboardMeta } from "@/constants/page-titles/dashboard";
import { designsMeta } from "@/constants/page-titles/designs";
import { getDesignBySlug } from "@/features/designs/data/get-design";
import { LandingPageLegend } from "@/features/landing-pages/components/landing-page-legend";
import { columns } from "@/features/landing-pages/components/table/landing-page-columns";
import { IBreadcrumb } from "@/types/breadcrumb";
import { notFound } from "next/navigation";

const BREADCRUMBS = ({ href, label }: IBreadcrumb): IBreadcrumb[] => {
  return [
    {
      href: dashboardMeta.href,
      label: dashboardMeta.label.singular,
    },
    {
      href: designsMeta.href,
      label: designsMeta.label.plural,
    },
    {
      href,
      label,
    },
  ];
};

interface Props {
  params: Promise<{
    designId: string;
  }>;
}

const DesignPage = async ({ params }: Props) => {
  const { designId } = await params;

  const design = await getDesignBySlug(designId);

  if (!design) notFound();

  const designHref = `${designsMeta.href}/${design.slug}`;

  return (
    <PageStructure>
      <PageBreadcrumbs
        crumbs={BREADCRUMBS({
          href: designsMeta.href,
          label: design.name,
        })}
      />
      <PageTtle
        label={design?.name}
        backBtnHref={designsMeta.href}
        editBtnHref={`${designHref}/edit`}
      />

      <div>
        <CustomAvatar
          image={design.avatar}
          className="h-[220px] w-[350px] overflow-hidden rounded-md bg-black"
        />
      </div>

      <section>
        <h2 className="text-heading4">Landing pages</h2>
        <DataTable
          columns={columns}
          data={design.landingPages}
          columnVisibilityObj={{
            slug: false,
            fxoroFooter: false,
            requester: false,
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

export default DesignPage;
