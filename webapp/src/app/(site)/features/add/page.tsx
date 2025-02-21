import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { dashboardMeta } from "@/constants/page-titles/dashboard";
import { featuresTypeMeta } from "@/constants/page-titles/features";
import { LandingPageFeatureAddForm } from "@/features/landing-page-features/components/form/landing-page-feature-add";
import { redirectUser } from "@/lib/redirect-user";
import { IBreadcrumb } from "@/types/breadcrumb";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: dashboardMeta.href,
    label: dashboardMeta.label.singular,
  },
  {
    href: featuresTypeMeta.href,
    label: featuresTypeMeta.label.plural,
  },
  {
    href: `${featuresTypeMeta.href}/add`,
    label: `Add ${featuresTypeMeta.label.plural}`,
  },
];

const AddLandingPageFeaturePage = async () => {
  await redirectUser(featuresTypeMeta.href);

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTtle
        label={`Add ${featuresTypeMeta.label.plural}`}
        backBtnHref={featuresTypeMeta.href}
      />

      <LandingPageFeatureAddForm />
    </PageStructure>
  );
};

export default AddLandingPageFeaturePage;
