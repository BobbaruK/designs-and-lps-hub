import { CustomAlert } from "@/components/custom-alert";
import { DataTable } from "@/components/data-table";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { ACTION_MESSAGES } from "@/constants/messages";
import { dashboardMeta } from "@/constants/page-titles/dashboard";
import { licensesMeta } from "@/constants/page-titles/licenses";
import { columns } from "@/features/licenses/components/table/columns";
import { getLicenses } from "@/features/licenses/data/get-licenses";
import { IBreadcrumb } from "@/types/breadcrumb";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: dashboardMeta.href,
    label: dashboardMeta.label.singular,
  },
  {
    href: licensesMeta.href,
    label: licensesMeta.label.plural,
  },
];

const LicensesPage = async () => {
  const licenses = await getLicenses();

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTtle
        label={licensesMeta.label.plural}
        addBtnHref={`${licensesMeta.href}/add`}
      />
      {!licenses ? (
        <CustomAlert
          title={"Error!"}
          description={ACTION_MESSAGES(licensesMeta.label.plural).CUSTOM_ALERT}
          variant="destructive"
        />
      ) : (
        <DataTable
          columns={columns}
          data={licenses}
          columnVisibilityObj={{
            slug: false,
            description: false,
          }}
        />
      )}
    </PageStructure>
  );
};

export default LicensesPage;
