import { CustomAlert } from "@/components/custom-alert";
import { DataTable } from "@/components/data-table";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { ACTION_MESSAGES } from "@/constants/messages";
import { columns } from "@/features/brand-logos/components/table/colums";
import { getBrandLogos } from "@/features/brand-logos/data/get-brand-logos";
import { IBreadcrumb } from "@/types/breadcrumb";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: "/dashboard",
    label: "Home",
  },
  {
    label: "Admin",
  },
  {
    href: "/brand-logos",
    label: "Brand Logos",
  },
];

const BrandLogosPage = async () => {
  const brandLogos = await getBrandLogos();

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTtle label={"Brand Logos"} addBtnHref="/brand-logos/add" />
      {!brandLogos ? (
        <CustomAlert
          title={"Error!"}
          description={ACTION_MESSAGES("Brand Logos").CUSTOM_ALERT}
          variant="destructive"
        />
      ) : (
        <DataTable
          columns={columns}
          data={brandLogos}
          columnVisibilityObj={{}}
        />
      )}
    </PageStructure>
  );
};

export default BrandLogosPage;
