import { CustomAlert } from "@/components/custom-alert";
import { DataTable } from "@/components/data-table";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { columns } from "@/features/flags/components/table/colums";
import { getFlags } from "@/features/flags/data/get-flags";
import { IBreadcrumb } from "@/types";

const FlagsPage = async () => {
  const BREADCRUMBS: IBreadcrumb[] = [
    {
      href: "/dashboard",
      label: "Home",
    },
    {
      label: "Admin",
    },
    {
      href: "/flags",
      label: "Flags",
    },
  ];

  const flags = await getFlags();

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTtle label={"Flags"} addBtnHref="/flags/add" />
      {!flags ? (
        <CustomAlert
          title={"Error!"}
          description={`Something went wrong. Flags do not return any data.`}
          variant="destructive"
        />
      ) : (
        <DataTable columns={columns} data={flags} columnVisibilityObj={{}} />
      )}
    </PageStructure>
  );
};

export default FlagsPage;
