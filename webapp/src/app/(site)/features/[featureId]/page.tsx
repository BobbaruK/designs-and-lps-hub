import { DataTable } from "@/components/data-table";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTitle } from "@/components/page-title";
import { featuresTypeMeta } from "@/constants/page-titles/features";
import { getLandingPageFeatureBySlug } from "@/features/landing-page-features/data/get-landing-page-feature";
import { LandingPageLegend } from "@/features/landing-pages/components/landing-page-legend";
import { columns } from "@/features/landing-pages/components/table/landing-page-columns";
import { breadCrumbsFn } from "@/lib/breadcrumbs";
import { capitalizeFirstLetter } from "@/lib/utils";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    featureId: string;
  }>;
}

const LandingPageFeaturePage = async ({ params }: Props) => {
  const { featureId } = await params;

  const landingPageFeature = await getLandingPageFeatureBySlug(featureId);

  if (!landingPageFeature) notFound();

  const landingPageTypeHref = `${featuresTypeMeta.href}/${landingPageFeature.slug}`;

  return (
    <PageStructure>
      <PageBreadcrumbs
        crumbs={breadCrumbsFn([
          {
            href: featuresTypeMeta.href,
            label: capitalizeFirstLetter(featuresTypeMeta.label.plural),
          },
          {
            href: landingPageTypeHref,
            label: landingPageFeature.name,
          },
        ])}
      />
      <PageTitle
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
            features: false,
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

export default LandingPageFeaturePage;
