import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { dashboardMeta } from "@/constants/page-titles/dashboard";
import { landingPageTypeMeta } from "@/constants/page-titles/landing-page-type";
import { LandingPageTypeAddForm } from "@/features/landing-page-types/components/form/landing-page-type-add";
import { redirectUser } from "@/lib/redirect-user";
import { IBreadcrumb } from "@/types/breadcrumb";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: dashboardMeta.href,
    label: dashboardMeta.label.singular,
  },
  {
    href: landingPageTypeMeta.href,
    label: landingPageTypeMeta.label.plural,
  },
  {
    href: `${landingPageTypeMeta.href}/add`,
    label: `Add ${landingPageTypeMeta.label.plural}`,
  },
];

const AddLandingPageTypePage = async () => {
  await redirectUser(landingPageTypeMeta.href);

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTtle
        label={`Add ${landingPageTypeMeta.label.plural}`}
        backBtnHref={landingPageTypeMeta.href}
      />

      <LandingPageTypeAddForm />
    </PageStructure>
  );
};

export default AddLandingPageTypePage;
