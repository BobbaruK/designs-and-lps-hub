import { CustomAlert } from "@/components/custom-alert";
import { DataTable } from "@/components/data-table";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { ACTION_MESSAGES } from "@/constants/messages";
import { dashboardMeta } from "@/constants/page-titles/dashboard";
import { designsMeta } from "@/constants/page-titles/designs";
import { columns } from "@/features/designs/components/table/columns";
import { getDesigns } from "@/features/designs/data/get-designs";
import { capitalizeFirstLetter } from "@/lib/utils";
import { IBreadcrumb } from "@/types/breadcrumb";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: dashboardMeta.href,
    label: dashboardMeta.label.singular,
  },
  {
    href: designsMeta.href,
    label: capitalizeFirstLetter(designsMeta.label.plural),
  },
];

const DesignsPage = async () => {
  const designs = await getDesigns();

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTtle
        label={capitalizeFirstLetter(designsMeta.label.plural)}
        addBtnHref={`${designsMeta.href}/add`}
      />
      {!designs ? (
        <CustomAlert
          title={"Error!"}
          description={ACTION_MESSAGES(designsMeta.label.plural).CUSTOM_ALERT}
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
