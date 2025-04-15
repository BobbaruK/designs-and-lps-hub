import { DataTable } from "@/components/data-table";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTitle } from "@/components/page-title";
import { landingPageTypeMeta } from "@/constants/page-titles/landing-page-type";
import { getLandingPageTypeBySlug } from "@/features/landing-page-types/data/get-landing-page-type";
import { LandingPageLegend } from "@/features/landing-pages/components/landing-page-legend";
import { columns } from "@/features/landing-pages/components/table/landing-page-columns";
import { breadCrumbsFn } from "@/lib/breadcrumbs";
import { capitalizeFirstLetter } from "@/lib/utils";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    landingPageTypeId: string;
  }>;
}

const LandingPageTypePage = async ({ params }: Props) => {
  const { landingPageTypeId } = await params;

  const landingPageType = await getLandingPageTypeBySlug(landingPageTypeId);

  if (!landingPageType) notFound();

  const landingPageTypeHref = `${landingPageTypeMeta.href}/${landingPageType.slug}`;

  return (
    <PageStructure>
      <PageBreadcrumbs
        crumbs={breadCrumbsFn([
          {
            href: landingPageTypeMeta.href,
            label: capitalizeFirstLetter(landingPageTypeMeta.label.plural),
          },
          {
            href: landingPageTypeHref,
            label: landingPageType.name,
          },
        ])}
      />
      <PageTitle
        label={landingPageType?.name}
        backBtnHref={landingPageTypeMeta.href}
        editBtnHref={`${landingPageTypeHref}/edit`}
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
            landingPageType: false,
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

export default LandingPageTypePage;
