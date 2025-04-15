import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTitle } from "@/components/page-title";
import { landingPageTypeMeta } from "@/constants/page-titles/landing-page-type";
import { LandingPageTypeAddForm } from "@/features/landing-page-types/components/form/landing-page-type-add";
import { breadCrumbsFn } from "@/lib/breadcrumbs";
import { redirectUser } from "@/lib/redirect-user";
import { capitalizeFirstLetter } from "@/lib/utils";
import { IBreadcrumb } from "@/types/breadcrumb";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: landingPageTypeMeta.href,
    label: capitalizeFirstLetter(landingPageTypeMeta.label.plural),
  },
  {
    href: `${landingPageTypeMeta.href}/add`,
    label: `Add ${landingPageTypeMeta.label.singular.toLowerCase()}`,
  },
];

const AddLandingPageTypePage = async () => {
  await redirectUser(landingPageTypeMeta.href);

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={breadCrumbsFn(BREADCRUMBS)} />
      <PageTitle
        label={`Add ${landingPageTypeMeta.label.singular.toLowerCase()}`}
        backBtnHref={landingPageTypeMeta.href}
      />

      <LandingPageTypeAddForm />
    </PageStructure>
  );
};

export default AddLandingPageTypePage;
