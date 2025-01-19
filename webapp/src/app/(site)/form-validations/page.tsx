import { CustomAlert } from "@/components/custom-alert";
import { DataTable } from "@/components/data-table";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { ACTION_MESSAGES } from "@/constants/messages";
import { columns } from "@/features/form-validations/components/table/colums";
import { getFormValidations } from "@/features/form-validations/data/get-form-validations";
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
];

const FormValidationPage = async () => {
  const formValidations = await getFormValidations();

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTtle label="Form Validations" addBtnHref="/form-validations/add" />
      {!formValidations ? (
        <CustomAlert
          title={"Error!"}
          description={ACTION_MESSAGES("Form Validations").CUSTOM_ALERT}
          variant="destructive"
        />
      ) : (
        <DataTable
          columns={columns}
          data={formValidations}
          columnVisibilityObj={{
            slug: false,
            description: false,
          }}
        />
      )}
    </PageStructure>
  );
};

export default FormValidationPage;
