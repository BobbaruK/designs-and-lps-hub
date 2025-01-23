import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { dashboardMeta } from "@/constants/page-titles/dashboard";
import { formValidationsMeta } from "@/constants/page-titles/form-validations";
import { FormValidationEditForm } from "@/features/form-validations/components/form/form-validation-edit";
import { getFormValidationBySlug } from "@/features/form-validations/data/get-form-validation";
import { redirectUser } from "@/lib/redirect-user";
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

const EditFormValidationPage = async ({ params }: Props) => {
  const { formValidationId } = await params;

  const formValidationHref = `${formValidationsMeta.href}/${formValidationId}`;

  await redirectUser(formValidationHref);

  const formValidation = await getFormValidationBySlug(formValidationId);

  if (!formValidation) notFound();

  return (
    <PageStructure>
      <PageBreadcrumbs
        crumbs={BREADCRUMBS({
          href: formValidationHref,
          label: "Edit " + formValidation.name,
        })}
      />
      <PageTtle
        label={`Edit "${formValidation.name}"`}
        backBtnHref={formValidationHref}
      />

      <FormValidationEditForm formValidation={formValidation} />
    </PageStructure>
  );
};

export default EditFormValidationPage;
