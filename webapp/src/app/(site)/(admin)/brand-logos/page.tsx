import { CustomAlert } from "@/components/custom-alert";
import { DataTable } from "@/components/data-table";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { ACTION_MESSAGES } from "@/constants/messages";
import { brandLogosMeta } from "@/constants/page-titles/brand-logos";
import { dashboardMeta } from "@/constants/page-titles/dashboard";
import { columns } from "@/features/brand-logos/components/table/columns";
import { getBrandLogos } from "@/features/brand-logos/data/get-brand-logos";
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
    href: brandLogosMeta.href,
    label: brandLogosMeta.label.plural,
  },
];

const BrandLogosPage = async () => {
  const brandLogos = await getBrandLogos();

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTtle
        label={brandLogosMeta.label.plural}
        addBtnHref={`${brandLogosMeta.href}/add`}
      />
      {!brandLogos ? (
        <CustomAlert
          title={"Error!"}
          description={
            ACTION_MESSAGES(brandLogosMeta.label.plural).CUSTOM_ALERT
          }
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
