import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTitle } from "@/components/page-title";
import { licensesMeta } from "@/constants/page-titles/licenses";
import { LicenseEditForm } from "@/features/licenses/components/form/license-edit";
import { getLicenseBySlug } from "@/features/licenses/data/get-license";
import { breadCrumbsFn } from "@/lib/breadcrumbs";
import { redirectUser } from "@/lib/redirect-user";
import { capitalizeFirstLetter } from "@/lib/utils";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    licenseId: string;
  }>;
}

const EditLicensePage = async ({ params }: Props) => {
  const { licenseId } = await params;

  const licenseHref = `${licensesMeta.href}/${licenseId}`;

  await redirectUser(licenseHref);

  const license = await getLicenseBySlug(licenseId);

  if (!license) notFound();

  return (
    <PageStructure>
      <PageBreadcrumbs
        crumbs={breadCrumbsFn([
          {
            href: licensesMeta.href,
            label: capitalizeFirstLetter(licensesMeta.label.plural),
          },
          {
            href: licenseHref,
            label: `Edit ${licensesMeta.label.singular.toLowerCase()} "${license.name}"`,
          },
        ])}
      />
      <PageTitle
        label={`Edit ${licensesMeta.label.singular.toLowerCase()} "${license.name}"`}
        backBtnHref={licenseHref}
      />

      <LicenseEditForm license={license} />
    </PageStructure>
  );
};

export default EditLicensePage;
