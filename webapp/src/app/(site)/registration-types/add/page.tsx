import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { dashboardMeta } from "@/constants/page-titles/dashboard";
import { registrationTypesMeta } from "@/constants/page-titles/registration-types";
import { RegistrationTypeAddForm } from "@/features/registration-types/components/form/registration-type-add";
import { redirectUser } from "@/lib/redirect-user";
import { IBreadcrumb } from "@/types/breadcrumb";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: dashboardMeta.href,
    label: dashboardMeta.label.singular,
  },
  {
    href: registrationTypesMeta.href,
    label: registrationTypesMeta.label.plural,
  },
  {
    href: `${registrationTypesMeta.href}/add`,
    label: `Add ${registrationTypesMeta.label.singular}`,
  },
];

const AddregistrationTypePage = async () => {
  await redirectUser(registrationTypesMeta.href);

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTtle
        label={`Add ${registrationTypesMeta.label.singular}`}
        backBtnHref={registrationTypesMeta.href}
      />

      <RegistrationTypeAddForm />
    </PageStructure>
  );
};

export default AddregistrationTypePage;
