import { DataTable } from "@/components/data-table";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { dashboardMeta } from "@/constants/page-titles/dashboard";
import { registrationTypesMeta } from "@/constants/page-titles/registration-types";
import { getRegistrationTypeBySlug } from "@/features/registration-types/data/get-registration-type";
import { LandingPageLegend } from "@/features/landing-pages/components/landing-page-legend";
import { columns } from "@/features/landing-pages/components/table/landing-page-columns";
import { IBreadcrumb } from "@/types/breadcrumb";
import { notFound } from "next/navigation";
import { capitalizeFirstLetter } from "@/lib/utils";

const BREADCRUMBS = ({ href, label }: IBreadcrumb): IBreadcrumb[] => {
  return [
    {
      href: dashboardMeta.href,
      label: dashboardMeta.label.singular,
    },
    {
      href: registrationTypesMeta.href,
      label: capitalizeFirstLetter(registrationTypesMeta.label.plural),
    },
    {
      href,
      label,
    },
  ];
};

interface Props {
  params: Promise<{
    registrationTypeId: string;
  }>;
}

const registrationTypePage = async ({ params }: Props) => {
  const { registrationTypeId } = await params;

  const registrationTypeHref = `${registrationTypesMeta.href}/${registrationTypeId}`;

  const registrationType = await getRegistrationTypeBySlug(registrationTypeId);

  if (!registrationType) notFound();

  return (
    <PageStructure>
      <PageBreadcrumbs
        crumbs={BREADCRUMBS({
          href: registrationTypeHref,
          label: registrationType.name,
        })}
      />
      <PageTtle
        label={registrationType.name}
        backBtnHref={registrationTypesMeta.href}
        editBtnHref={`${registrationTypeHref}/edit`}
      />
      <div>
        {registrationType.description ? (
          <pre className="whitespace-pre-wrap">
            {registrationType.description}
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
          data={registrationType.landingPages}
          columnVisibilityObj={{
            slug: false,
            fxoroFooter: false,
            requester: false,
            registrationType: false,
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

export default registrationTypePage;
