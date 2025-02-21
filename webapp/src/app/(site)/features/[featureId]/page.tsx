import { DataTable } from "@/components/data-table";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { dashboardMeta } from "@/constants/page-titles/dashboard";
import { featuresTypeMeta } from "@/constants/page-titles/features";
import { getLandingPageFeatureBySlug } from "@/features/landing-page-features/data/get-landing-page-feature";
import { getLandingPageTypeBySlug } from "@/features/landing-page-types/data/get-landing-page-type";
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
      href: featuresTypeMeta.href,
      label: featuresTypeMeta.label.plural,
    },
    {
      href,
      label,
    },
  ];
};

interface Props {
  params: Promise<{
    featureId: string;
  }>;
}

const LandingPageTypePage = async ({ params }: Props) => {
  const { featureId } = await params;

  const landingPageFeature = await getLandingPageFeatureBySlug(featureId);

  if (!landingPageFeature) notFound();

  const landingPageTypeHref = `${featuresTypeMeta.href}/${landingPageFeature.slug}`;

  return (
    <PageStructure>
      <PageBreadcrumbs
        crumbs={BREADCRUMBS({
          href: landingPageTypeHref,
          label: landingPageFeature.name,
        })}
      />
      <PageTtle
        label={landingPageFeature?.name}
        backBtnHref={featuresTypeMeta.href}
        editBtnHref={`${landingPageTypeHref}/edit`}
      />
      <div>
        {landingPageFeature.description ? (
          <pre className="whitespace-pre-wrap">
            {landingPageFeature.description}
          </pre>
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
          data={landingPageFeature.landingPages}
          columnVisibilityObj={{
            slug: false,
            fxoroFooter: false,
            requester: false,
            landingPageType: false,
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

export default LandingPageTypePage;
