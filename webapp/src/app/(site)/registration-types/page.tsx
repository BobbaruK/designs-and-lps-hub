import { CustomAlert } from "@/components/custom-alert";
import { DataTable } from "@/components/data-table";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { ACTION_MESSAGES } from "@/constants/messages";
import { dashboardMeta } from "@/constants/page-titles/dashboard";
import { registrationTypesMeta } from "@/constants/page-titles/registration-types";
import { columns } from "@/features/registration-types/components/table/columns";
import { getRegistrationTypes } from "@/features/registration-types/data/get-registration-types";
import { IBreadcrumb } from "@/types/breadcrumb";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: dashboardMeta.href,
    label: dashboardMeta.label.singular,
  },
  {
    href: registrationTypesMeta.href,
    label: registrationTypesMeta.label.plural,
  },
];

const RegistrationTypesPage = async () => {
  const registrationTypes = await getRegistrationTypes();

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTtle
        label={registrationTypesMeta.label.plural}
        addBtnHref={`${registrationTypesMeta.href}/add`}
      />
      {!registrationTypes ? (
        <CustomAlert
          title={"Error!"}
          description={
            ACTION_MESSAGES(registrationTypesMeta.label.plural).CUSTOM_ALERT
          }
          variant="destructive"
        />
      ) : (
        <DataTable
          columns={columns}
          data={registrationTypes}
          columnVisibilityObj={{
            slug: false,
            description: false,
          }}
        />
      )}
    </PageStructure>
  );
};

export default RegistrationTypesPage;
