import { CustomAvatar } from "@/components/custom-avatar";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/data-table/landing-page-columns";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { getDesignBySlug } from "@/features/designs/data/get-design";
import { IBreadcrumb } from "@/types/breadcrumb";
import { notFound } from "next/navigation";

const BREADCRUMBS = ({ href, label }: IBreadcrumb): IBreadcrumb[] => {
  return [
    {
      href: "/dashboard",
      label: "Home",
    },
    {
      href: "/designs",
      label: "Designs",
    },
    {
      href,
      label,
    },
  ];
};

interface Props {
  params: Promise<{
    designId: string;
  }>;
}

const DesignPage = async ({ params }: Props) => {
  const { designId } = await params;

  const design = await getDesignBySlug(designId);

  if (!design) notFound();

  return (
    <PageStructure>
      <PageBreadcrumbs
        crumbs={BREADCRUMBS({
          href: `/designs/${design.slug}`,
          label: design.name,
        })}
      />
      <PageTtle
        label={design?.name}
        backBtnHref="/designs"
        editBtnHref={`/designs/${design.slug}/edit`}
      />

      <div>
        <CustomAvatar
          image={design.avatar}
          className="h-[220px] w-[350px] overflow-hidden rounded-md bg-black"
        />
      </div>

      <section>
        <h2 className="text-heading4">Landing pages</h2>
        <DataTable
          columns={columns}
          data={design.landingPages}
          columnVisibilityObj={{
            slug: false,
            fxoroFooter: false,
            requester: false,
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

export default DesignPage;
