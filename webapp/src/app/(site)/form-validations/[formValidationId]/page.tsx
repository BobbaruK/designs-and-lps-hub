import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { getFormValidationBySlug } from "@/features/form-validations/data/get-form-validation";
import { IBreadcrumb } from "@/types/breadcrumb";
import { notFound } from "next/navigation";

const BREADCRUMBS = ({ href, label }: IBreadcrumb): IBreadcrumb[] => {
  return [
    {
      href: "/dashboard",
      label: "Home",
    },
    {
      href: "/form-validations",
      label: "Form Validations",
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

  const formValidation = await getFormValidationBySlug(formValidationId);

  if (!formValidation) notFound();

  return (
    <PageStructure>
      <PageBreadcrumbs
        crumbs={BREADCRUMBS({
          href: `/form-validations/${formValidation.slug}`,
          label: formValidation.name,
        })}
      />
      <PageTtle
        label={formValidation?.name}
        backBtnHref="/form-validations"
        editBtnHref={`/form-validations/${formValidation.slug}/edit`}
      />

      {formValidation.description ? (
        <div>
          <pre className="whitespace-pre-wrap">
            {formValidation.description}
          </pre>
        </div>
      ) : (
        <p>
          <span className="italic">There is no description added</span>
        </p>
      )}
    </PageStructure>
  );
};

export default FormValidationPage;
