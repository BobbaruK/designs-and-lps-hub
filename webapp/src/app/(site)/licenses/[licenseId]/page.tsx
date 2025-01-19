import { DataTable } from "@/components/data-table";
import { columns } from "@/components/data-table/landing-page-columns";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { getLicenseBySlug } from "@/features/licenses/data/get-license";
import { getTopicBySlug } from "@/features/topics/data/get-topic";
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

const LicensePage = async ({ params }: Props) => {
  const { licenseId } = await params;

  const license = await getLicenseBySlug(licenseId);

  if (!license) notFound();

  return (
    <PageStructure>
      <PageBreadcrumbs
        crumbs={BREADCRUMBS({
          href: `/licenses/${license.slug}`,
          label: license.name,
        })}
      />
      <PageTtle
        label={license?.name}
        backBtnHref="/licenses"
        editBtnHref={`/licenses/${license.slug}/edit`}
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
