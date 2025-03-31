import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { dashboardMeta } from "@/constants/page-titles/dashboard";
import { licensesMeta } from "@/constants/page-titles/licenses";
import { LicenseAddForm } from "@/features/licenses/components/form/licenses-add";
import { redirectUser } from "@/lib/redirect-user";
import { capitalizeFirstLetter } from "@/lib/utils";
import { IBreadcrumb } from "@/types/breadcrumb";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: dashboardMeta.href,
    label: dashboardMeta.label.singular,
  },
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
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTtle
        label={`Add ${licensesMeta.label.singular.toLowerCase()}`}
        backBtnHref={licensesMeta.href}
      />

      <LicenseAddForm />
    </PageStructure>
  );
};

export default AddLicensePage;
