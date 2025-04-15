import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTitle } from "@/components/page-title";
import { licensesMeta } from "@/constants/page-titles/licenses";
import { LicenseAddForm } from "@/features/licenses/components/form/licenses-add";
import { breadCrumbsFn } from "@/lib/breadcrumbs";
import { redirectUser } from "@/lib/redirect-user";
import { capitalizeFirstLetter } from "@/lib/utils";
import { IBreadcrumb } from "@/types/breadcrumb";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: licensesMeta.href,
    label: capitalizeFirstLetter(licensesMeta.label.plural),
  },
  {
    href: `${licensesMeta.href}/add`,
    label: `Add ${licensesMeta.label.singular.toLowerCase()}`,
  },
];

const AddLicensePage = async () => {
  await redirectUser(licensesMeta.href);

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={breadCrumbsFn(BREADCRUMBS)} />
      <PageTitle
        label={`Add ${licensesMeta.label.singular.toLowerCase()}`}
        backBtnHref={licensesMeta.href}
      />

      <LicenseAddForm />
    </PageStructure>
  );
};

export default AddLicensePage;
