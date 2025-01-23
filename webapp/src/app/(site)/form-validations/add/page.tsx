import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { dashboardMeta } from "@/constants/page-titles/dashboard";
import { formValidationsMeta } from "@/constants/page-titles/form-validations";
import { FormValidationAddForm } from "@/features/form-validations/components/form/form-validation-add";
import { redirectUser } from "@/lib/redirect-user";
import { IBreadcrumb } from "@/types/breadcrumb";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: dashboardMeta.href,
    label: dashboardMeta.label.singular,
  },
  {
    href: formValidationsMeta.href,
    label: formValidationsMeta.label.plural,
  },
  {
    href: `${formValidationsMeta.href}/add`,
    label: `Add ${formValidationsMeta.label.singular}`,
  },
];

const AddFormValidationPage = async () => {
  await redirectUser(formValidationsMeta.href);

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTtle
        label={`Add ${formValidationsMeta.label.singular}`}
        backBtnHref={formValidationsMeta.href}
      />

      <FormValidationAddForm />
    </PageStructure>
  );
};

export default AddFormValidationPage;
