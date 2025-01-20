import { CustomAlert } from "@/components/custom-alert";
import { DataTable } from "@/components/data-table";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { ACTION_MESSAGES } from "@/constants/messages";
import { columns } from "@/features/brands/components/table/colums";
import { getBrands } from "@/features/brands/data/get-brands";
import { IBreadcrumb } from "@/types/breadcrumb";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: "/dashboard",
    label: "Home",
  },
  {
    href: "/brands",
    label: "Brands",
  },
];

const BrandsPage = async () => {
  const brands = await getBrands();

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTtle label="Brands" addBtnHref="/brands/add" />
      {!brands ? (
        <CustomAlert
          title={"Error!"}
          description={ACTION_MESSAGES("Brands").CUSTOM_ALERT}
          variant="destructive"
        />
      ) : (
        <DataTable
          columns={columns}
          data={brands}
          columnVisibilityObj={{
            slug: false,
          }}
        />
      )}
    </PageStructure>
  );
};

export default BrandsPage;
