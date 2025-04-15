import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { registrationTypesMeta } from "@/constants/page-titles/registration-types";
import { RegistrationTypeAddForm } from "@/features/registration-types/components/form/registration-type-add";
import { breadCrumbsFn } from "@/lib/breadcrumbs";
import { redirectUser } from "@/lib/redirect-user";
import { capitalizeFirstLetter } from "@/lib/utils";
import { IBreadcrumb } from "@/types/breadcrumb";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: registrationTypesMeta.href,
    label: capitalizeFirstLetter(registrationTypesMeta.label.plural),
  },
  {
    href: `${registrationTypesMeta.href}/add`,
    label: `Add ${registrationTypesMeta.label.singular.toLowerCase()}`,
  },
];

const AddregistrationTypePage = async () => {
  await redirectUser(registrationTypesMeta.href);

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={breadCrumbsFn(BREADCRUMBS)} />
      <PageTtle
        label={`Add ${registrationTypesMeta.label.singular.toLowerCase()}`}
        backBtnHref={registrationTypesMeta.href}
      />

      <RegistrationTypeAddForm />
    </PageStructure>
  );
};

export default AddregistrationTypePage;
