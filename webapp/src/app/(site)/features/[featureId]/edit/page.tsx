import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { dashboardMeta } from "@/constants/page-titles/dashboard";
import { featuresTypeMeta } from "@/constants/page-titles/features";
import { LandingPageFeatureEditForm } from "@/features/landing-page-features/components/form/landing-page-feature-edit";
import { getLandingPageFeatureBySlug } from "@/features/landing-page-features/data/get-landing-page-feature";
import { redirectUser } from "@/lib/redirect-user";
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
      href: featuresTypeMeta.href,
      label: capitalizeFirstLetter(featuresTypeMeta.label.plural),
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

const EditLandingPageFeaturePage = async ({ params }: Props) => {
  const { featureId } = await params;

  const landingPageFeatureHref = `${featuresTypeMeta.href}/${featureId}`;

  await redirectUser(landingPageFeatureHref);

  const landingPageFeature = await getLandingPageFeatureBySlug(featureId);

  if (!landingPageFeature) notFound();

  return (
    <PageStructure>
      <PageBreadcrumbs
        crumbs={BREADCRUMBS({
          href: landingPageFeatureHref,
          label: `Edit ${featuresTypeMeta.label.singular.toLowerCase()} "${landingPageFeature.name}"`,
        })}
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
