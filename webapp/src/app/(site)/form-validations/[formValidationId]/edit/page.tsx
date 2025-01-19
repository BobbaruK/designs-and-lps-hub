import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { FormValidationEditForm } from "@/features/form-validations/components/form/form-validation-edit";
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
          label: "Edit " + formValidation.name,
        })}
      />
      <PageTtle
        label={`Edit "${formValidation?.name}"`}
        backBtnHref={`/form-validations/${formValidation.slug}`}
      />

      <FormValidationEditForm formValidation={formValidation} />
    </PageStructure>
  );
};

export default FormValidationPage;
