import { CustomAlert } from "@/components/custom-alert";
import { DataTable } from "@/components/data-table";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { ACTION_MESSAGES } from "@/constants/messages";
import { dashboardMeta } from "@/constants/page-titles/dashboard";
import { flagsMeta } from "@/constants/page-titles/flags";
import { columns } from "@/features/flags/components/table/columns";
import { getFlags } from "@/features/flags/data/get-flags";
import { IBreadcrumb } from "@/types/breadcrumb";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: dashboardMeta.href,
    label: dashboardMeta.label.singular,
  },
  {
    label: "Admin",
  },
  {
    href: flagsMeta.href,
    label: flagsMeta.label.plural,
  },
];

const FlagsPage = async () => {
  const flags = await getFlags();

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTtle
        label={flagsMeta.label.plural}
        addBtnHref={`${flagsMeta.href}/add`}
      />
      {!flags ? (
        <CustomAlert
          title={"Error!"}
          description={ACTION_MESSAGES(flagsMeta.label.plural).CUSTOM_ALERT}
          variant="destructive"
        />
      ) : (
        <DataTable columns={columns} data={flags} columnVisibilityObj={{}} />
      )}
    </PageStructure>
  );
};

export default FlagsPage;
