import { CustomAlert } from "@/components/custom-alert";
import { DataTable } from "@/components/data-table";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { ACTION_MESSAGES } from "@/constants/messages";
import { columns } from "@/features/designs/components/table/colums";
import { getDesigns } from "@/features/designs/data/get-designs";
import { IBreadcrumb } from "@/types/breadcrumb";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: "/dashboard",
    label: "Home",
  },
  {
    href: "/designs",
    label: "Designs",
  },
];

const DesignsPage = async () => {
  const designs = await getDesigns();

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTtle label="Designs" addBtnHref="/designs/add" />
      {!designs ? (
        <CustomAlert
          title={"Error!"}
          description={ACTION_MESSAGES("Designs").CUSTOM_ALERT}
          variant="destructive"
        />
      ) : (
        <DataTable
          columns={columns}
          data={designs}
          columnVisibilityObj={{
            slug: false,
          }}
        />
      )}
    </PageStructure>
  );
};

export default DesignsPage;
