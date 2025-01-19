import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { FormValidationAddForm } from "@/features/form-validations/components/form/form-validation-add";
import { IBreadcrumb } from "@/types/breadcrumb";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: "/dashboard",
    label: "Home",
  },
  {
    href: "/form-validations",
    label: "Form Validations",
  },
  {
    href: "/form-validations/add",
    label: "Add Form Validations",
  },
];

const AddFormValidationPage = () => {
  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTtle label="Add Form Validation" backBtnHref="/form-validations" />

      <FormValidationAddForm />
    </PageStructure>
  );
};

export default AddFormValidationPage;
