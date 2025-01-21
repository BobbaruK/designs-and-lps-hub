import { DataTable } from "@/components/data-table";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { getLandingPageTypeBySlug } from "@/features/landing-page-types/data/get-landing-page-type";
import { columns } from "@/features/landing-pages/components/table/landing-page-columns";
import { IBreadcrumb } from "@/types/breadcrumb";
import { notFound } from "next/navigation";

const BREADCRUMBS = ({ href, label }: IBreadcrumb): IBreadcrumb[] => {
  return [
    {
      href: "/dashboard",
      label: "Home",
    },
    {
      href: "/landing-page-types",
      label: "Landing Page Types",
    },
    {
      href,
      label,
    },
  ];
};

interface Props {
  params: Promise<{
    landingPageTypeId: string;
  }>;
}

const LandingPageTypePage = async ({ params }: Props) => {
  const { landingPageTypeId } = await params;

  const landingPageType = await getLandingPageTypeBySlug(landingPageTypeId);

  if (!landingPageType) notFound();

  return (
    <PageStructure>
      <PageBreadcrumbs
        crumbs={BREADCRUMBS({
          href: `/landing-page-types/${landingPageType.slug}`,
          label: landingPageType.name,
        })}
      />
      <PageTtle
        label={landingPageType?.name}
        backBtnHref="/landing-page-types"
        editBtnHref={`/landing-page-types/${landingPageType.slug}/edit`}
      />
      <div>
        {landingPageType.description ? (
          <pre className="whitespace-pre-wrap">
            {landingPageType.description}
          </pre>
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
          data={landingPageType.landingPages}
          columnVisibilityObj={{
            slug: false,
            fxoroFooter: false,
            requester: false,
            lpType: false,
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

export default LandingPageTypePage;
