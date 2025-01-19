import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { LandingPageTypeEditForm } from "@/features/landing-page-types/components/form/landing-page-type-edit";
import { getLandingPageTypeBySlug } from "@/features/landing-page-types/data/get-landing-page-type";
import { IBreadcrumb } from "@/types/breadcrumb";
import { notFound } from "next/navigation";

const BREADCRUMBS = ({ href, label }: IBreadcrumb): IBreadcrumb[] => {
  return [
    {
      href: "/dashboard",
      label: "Home",
    },
    {
      href: "/landing-page-types",
      label: "Landing Page Types",
    },
    {
      href,
      label,
    },
  ];
};

interface Props {
  params: Promise<{
    landingPageTypeId: string;
  }>;
}

const EditLandingPageTypePage = async ({ params }: Props) => {
  const { landingPageTypeId } = await params;

  const landingPageType = await getLandingPageTypeBySlug(landingPageTypeId);

  if (!landingPageType) notFound();

  return (
    <PageStructure>
      <PageBreadcrumbs
        crumbs={BREADCRUMBS({
          href: `/landing-page-types/${landingPageType.slug}`,
          label: "Edit " + landingPageType.name,
        })}
      />
      <PageTtle
        label={`Edit "${landingPageType?.name}"`}
        backBtnHref={`/landing-page-types/${landingPageType.slug}`}
      />

      <LandingPageTypeEditForm landingPageType={landingPageType} />
    </PageStructure>
  );
};

export default EditLandingPageTypePage;
