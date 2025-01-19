import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { LicenseEditForm } from "@/features/licenses/components/form/license-edit";
import { getLicenseBySlug } from "@/features/licenses/data/get-license";
import { IBreadcrumb } from "@/types/breadcrumb";
import { notFound } from "next/navigation";

const BREADCRUMBS = ({ href, label }: IBreadcrumb): IBreadcrumb[] => {
  return [
    {
      href: "/dashboard",
      label: "Home",
    },
    {
      href: "/licenses",
      label: "Licenses",
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

  const license = await getLicenseBySlug(licenseId);

  if (!license) notFound();

  return (
    <PageStructure>
      <PageBreadcrumbs
        crumbs={BREADCRUMBS({
          href: `/licenses/${license.slug}`,
          label: "Edit " + license.name,
        })}
      />
      <PageTtle
        label={`Edit "${license?.name}"`}
        backBtnHref={`/licenses/${license.slug}`}
      />

      <LicenseEditForm license={license} />
    </PageStructure>
  );
};

export default EditLicensePage;
