import { CustomAlert } from "@/components/custom-alert";
import { DataTable } from "@/components/data-table";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { ACTION_MESSAGES } from "@/constants/messages";
import { dashboardMeta } from "@/constants/page-titles/dashboard";
import { formValidationsMeta } from "@/constants/page-titles/form-validations";
import { columns } from "@/features/form-validations/components/table/columns";
import { getFormValidations } from "@/features/form-validations/data/get-form-validations";
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
];

const FormValidationsPage = async () => {
  const formValidations = await getFormValidations();

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTtle
        label={formValidationsMeta.label.plural}
        addBtnHref={`${formValidationsMeta.href}/add`}
      />
      {!formValidations ? (
        <CustomAlert
          title={"Error!"}
          description={
            ACTION_MESSAGES(formValidationsMeta.label.plural).CUSTOM_ALERT
          }
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

export default FormValidationsPage;
