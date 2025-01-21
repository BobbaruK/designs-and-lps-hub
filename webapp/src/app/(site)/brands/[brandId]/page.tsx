import { DataTable } from "@/components/data-table";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { getBrandBySlug } from "@/features/brands/data/get-brand";
import { columns } from "@/features/landing-pages/components/table/landing-page-columns";
import { IBreadcrumb } from "@/types/breadcrumb";
import { notFound } from "next/navigation";

const BREADCRUMBS = ({ href, label }: IBreadcrumb): IBreadcrumb[] => {
  return [
    {
      href: "/dashboard",
      label: "Home",
    },
    {
      href: "/brands",
      label: "Brands",
    },
    {
      href,
      label,
    },
  ];
};

interface Props {
  params: Promise<{
    brandId: string;
  }>;
}

const BrandPage = async ({ params }: Props) => {
  const { brandId } = await params;

  const brand = await getBrandBySlug(brandId);

  if (!brand) notFound();

  return (
    <PageStructure>
      <PageBreadcrumbs
        crumbs={BREADCRUMBS({
          href: `/brands/${brand.slug}`,
          label: brand.name,
        })}
      />
      <PageTtle
        label={brand?.name}
        backBtnHref="/brands"
        editBtnHref={`/brands/${brand.slug}/edit`}
      />

      <section>
        <h2 className="text-heading4">Landing pages</h2>
        <DataTable
          columns={columns}
          data={brand.landingPages}
          columnVisibilityObj={{
            slug: false,
            fxoroFooter: false,
            requester: false,
            brand: false,
            createdAt: false,
            createdBy: false,
            updatedAt: false,
            updatedBy: false,
          }}
        />
      </section>
    </PageStructure>
  );
};

export default BrandPage;
