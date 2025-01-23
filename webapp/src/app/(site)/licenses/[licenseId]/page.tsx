import { DataTable } from "@/components/data-table";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { dashboardMeta } from "@/constants/page-titles/dashboard";
import { licensesMeta } from "@/constants/page-titles/licenses";
import { columns } from "@/features/landing-pages/components/table/landing-page-columns";
import { getLicenseBySlug } from "@/features/licenses/data/get-license";
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

const LicensePage = async ({ params }: Props) => {
  const { licenseId } = await params;

  const licenseHref = `${licensesMeta.href}/${licenseId}`;

  const license = await getLicenseBySlug(licenseId);

  if (!license) notFound();

  return (
    <PageStructure>
      <PageBreadcrumbs
        crumbs={BREADCRUMBS({
          href: licenseHref,
          label: license.name,
        })}
      />
      <PageTtle
        label={license.name}
        backBtnHref={licensesMeta.href}
        editBtnHref={`${licenseHref}/edit`}
      />
      <div>
        {license.description ? (
          <pre className="whitespace-pre-wrap">{license.description}</pre>
        ) : (
          <p>
            <span className="italic">There is no description added</span>
          </p>
        )}
      </div>

      <section>
        <h2 className="text-heading4">Landing pages</h2>
        <DataTable
          columns={columns}
          data={license.landingPages}
          columnVisibilityObj={{
            slug: false,
            fxoroFooter: false,
            requester: false,
            license: false,
            createdAt: false,
            createdBy: false,
            updatedAt: false,
            updatedBy: false,
          }}
        />
      </section>
    </PageStructure>
  );
};

export default LicensePage;
