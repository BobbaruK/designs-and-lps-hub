import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { IBreadcrumb } from "@/types";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: "/dashboard",
    label: "Home",
  },
  {
    href: "/form-validation",
    label: "Form Validation",
  },
  {
    href: "/form-validation/add",
    label: "Add Form Validation",
  },
];

const AddFormValidationPage = () => {
  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTtle label="Add Form Validation" backBtnHref="/form-validation" />
      <div>add form valid here</div>
    </PageStructure>
  );
};

export default AddFormValidationPage;
