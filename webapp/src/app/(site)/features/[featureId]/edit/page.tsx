import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { featuresTypeMeta } from "@/constants/page-titles/features";
import { LandingPageFeatureEditForm } from "@/features/landing-page-features/components/form/landing-page-feature-edit";
import { getLandingPageFeatureBySlug } from "@/features/landing-page-features/data/get-landing-page-feature";
import { breadCrumbsFn } from "@/lib/breadcrumbs";
import { redirectUser } from "@/lib/redirect-user";
import { capitalizeFirstLetter } from "@/lib/utils";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    featureId: string;
  }>;
}

const EditLandingPageFeaturePage = async ({ params }: Props) => {
  const { featureId } = await params;

  const landingPageFeatureHref = `${featuresTypeMeta.href}/${featureId}`;

  await redirectUser(landingPageFeatureHref);

  const landingPageFeature = await getLandingPageFeatureBySlug(featureId);

  if (!landingPageFeature) notFound();

  return (
    <PageStructure>
      <PageBreadcrumbs
        crumbs={breadCrumbsFn([
          {
            href: featuresTypeMeta.href,
            label: capitalizeFirstLetter(featuresTypeMeta.label.plural),
          },
          {
            href: landingPageFeatureHref,
            label: `Edit ${featuresTypeMeta.label.singular.toLowerCase()} "${landingPageFeature.name}"`,
          },
        ])}
      />
      <PageTtle
        label={`Edit ${featuresTypeMeta.label.singular.toLowerCase()} "${landingPageFeature.name}"`}
        backBtnHref={landingPageFeatureHref}
      />

      <LandingPageFeatureEditForm landingPageFeature={landingPageFeature} />
    </PageStructure>
  );
};

export default EditLandingPageFeaturePage;
