import { DataTable } from "@/components/data-table";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { licensesMeta } from "@/constants/page-titles/licenses";
import { LandingPageLegend } from "@/features/landing-pages/components/landing-page-legend";
import { columns } from "@/features/landing-pages/components/table/landing-page-columns";
import { getLicenseBySlug } from "@/features/licenses/data/get-license";
import { breadCrumbsFn } from "@/lib/breadcrumbs";
import { capitalizeFirstLetter } from "@/lib/utils";
import { notFound } from "next/navigation";

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
        crumbs={breadCrumbsFn([
          {
            href: licensesMeta.href,
            label: capitalizeFirstLetter(licensesMeta.label.plural),
          },
          {
            href: licenseHref,
            label: license.name,
          },
        ])}
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
          legendItems={<LandingPageLegend />}
        />
      </section>
    </PageStructure>
  );
};

export default LicensePage;
