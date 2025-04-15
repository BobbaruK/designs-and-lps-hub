import { CustomAlert } from "@/components/custom-alert";
import { DataTable } from "@/components/data-table";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTitle } from "@/components/page-title";
import { ACTION_MESSAGES } from "@/constants/messages";
import { brandResourcesMeta } from "@/constants/page-titles/brand-resources";
import { columns } from "@/features/brand-resources/components/table/columns";
import { getBrandResources } from "@/features/brand-resources/data/get-brand-resources";
import { breadCrumbsFn } from "@/lib/breadcrumbs";
import { capitalizeFirstLetter } from "@/lib/utils";
import { IBreadcrumb } from "@/types/breadcrumb";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    label: "Admin",
  },
  {
    href: brandResourcesMeta.href,
    label: capitalizeFirstLetter(brandResourcesMeta.label.plural),
  },
];

const BrandResourcesPage = async () => {
  const brandResources = await getBrandResources();

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={breadCrumbsFn(BREADCRUMBS)} />
      <PageTitle
        label={capitalizeFirstLetter(brandResourcesMeta.label.plural)}
        addBtnHref={`${brandResourcesMeta.href}/add`}
      />
      {!brandResources ? (
        <CustomAlert
          title={"Error!"}
          description={
            ACTION_MESSAGES(brandResourcesMeta.label.plural).CUSTOM_ALERT
          }
          variant="destructive"
        />
      ) : (
        <DataTable
          columns={columns}
          data={brandResources}
          columnVisibilityObj={{}}
        />
      )}
    </PageStructure>
  );
};

export default BrandResourcesPage;
