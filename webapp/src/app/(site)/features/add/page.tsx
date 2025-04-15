import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTitle } from "@/components/page-title";
import { featuresTypeMeta } from "@/constants/page-titles/features";
import { LandingPageFeatureAddForm } from "@/features/landing-page-features/components/form/landing-page-feature-add";
import { breadCrumbsFn } from "@/lib/breadcrumbs";
import { redirectUser } from "@/lib/redirect-user";
import { capitalizeFirstLetter } from "@/lib/utils";
import { IBreadcrumb } from "@/types/breadcrumb";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: featuresTypeMeta.href,
    label: capitalizeFirstLetter(featuresTypeMeta.label.plural),
  },
  {
    href: `${featuresTypeMeta.href}/add`,
    label: `Add ${featuresTypeMeta.label.singular.toLowerCase()}`,
  },
];

const AddLandingPageFeaturePage = async () => {
  await redirectUser(featuresTypeMeta.href);

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={breadCrumbsFn(BREADCRUMBS)} />
      <PageTitle
        label={`Add ${featuresTypeMeta.label.singular.toLowerCase()}`}
        backBtnHref={featuresTypeMeta.href}
      />

      <LandingPageFeatureAddForm />
    </PageStructure>
  );
};

export default AddLandingPageFeaturePage;
