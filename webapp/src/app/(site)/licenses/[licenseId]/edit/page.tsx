import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { dashboardMeta } from "@/constants/page-titles/dashboard";
import { licensesMeta } from "@/constants/page-titles/licenses";
import { LicenseEditForm } from "@/features/licenses/components/form/license-edit";
import { getLicenseBySlug } from "@/features/licenses/data/get-license";
import { redirectUser } from "@/lib/redirect-user";
import { IBreadcrumb } from "@/types/breadcrumb";
import { notFound } from "next/navigation";

const BREADCRUMBS = ({ href, label }: IBreadcrumb): IBreadcrumb[] => {
  return [
    {
      href: dashboardMeta.href,
      label: dashboardMeta.label.singular,
    },
    {
      href: licensesMeta.href,
      label: licensesMeta.label.plural,
    },
    {
      href,
      label,
    },
  ];
};

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
        crumbs={BREADCRUMBS({
          href: licenseHref,
          label: "Edit " + license.name,
        })}
      />
      <PageTtle label={`Edit "${license.name}"`} backBtnHref={licenseHref} />

      <LicenseEditForm license={license} />
    </PageStructure>
  );
};

export default EditLicensePage;
