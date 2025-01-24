import { DataTable } from "@/components/data-table";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { dashboardMeta } from "@/constants/page-titles/dashboard";
import { formValidationsMeta } from "@/constants/page-titles/form-validations";
import { getFormValidationBySlug } from "@/features/form-validations/data/get-form-validation";
import { LandingPageLegend } from "@/features/landing-pages/components/landing-page-legend";
import { columns } from "@/features/landing-pages/components/table/landing-page-columns";
import { IBreadcrumb } from "@/types/breadcrumb";
import { notFound } from "next/navigation";

const BREADCRUMBS = ({ href, label }: IBreadcrumb): IBreadcrumb[] => {
  return [
    {
      href: dashboardMeta.href,
      label: dashboardMeta.label.singular,
    },
    {
      href: formValidationsMeta.href,
      label: formValidationsMeta.label.plural,
    },
    {
      href,
      label,
    },
  ];
};

interface Props {
  params: Promise<{
    formValidationId: string;
  }>;
}

const FormValidationPage = async ({ params }: Props) => {
  const { formValidationId } = await params;

  const formValidationHref = `${formValidationsMeta.href}/${formValidationId}`;

  const formValidation = await getFormValidationBySlug(formValidationId);

  if (!formValidation) notFound();

  return (
    <PageStructure>
      <PageBreadcrumbs
        crumbs={BREADCRUMBS({
          href: formValidationHref,
          label: formValidation.name,
        })}
      />
      <PageTtle
        label={formValidation.name}
        backBtnHref={formValidationsMeta.href}
        editBtnHref={`${formValidationHref}/edit`}
      />
      <div>
        {formValidation.description ? (
          <pre className="whitespace-pre-wrap">
            {formValidation.description}
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
          data={formValidation.landingPages}
          columnVisibilityObj={{
            slug: false,
            fxoroFooter: false,
            requester: false,
            formValidation: false,
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

export default FormValidationPage;
