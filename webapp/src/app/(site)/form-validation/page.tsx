import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { IBreadcrumb } from "@/types/breadcrumb";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: "/dashboard",
    label: "Home",
  },
  {
    href: "/form-validation",
    label: "Form Validation",
  },
];

const FormValidationPage = () => {
  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTtle label="Form Validations" addBtnHref="/form-validation/add" />
      <div>form valids here</div>
    </PageStructure>
  );
};

export default FormValidationPage;
