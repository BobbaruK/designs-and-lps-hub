import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { dashboardMeta } from "@/constants/page-titles/dashboard";
import { landingPageTypeMeta } from "@/constants/page-titles/landing-page-type";
import { LandingPageTypeEditForm } from "@/features/landing-page-types/components/form/landing-page-type-edit";
import { getLandingPageTypeBySlug } from "@/features/landing-page-types/data/get-landing-page-type";
import { redirectUser } from "@/lib/redirect-user";
import { capitalizeFirstLetter } from "@/lib/utils";
import { IBreadcrumb } from "@/types/breadcrumb";
import { notFound } from "next/navigation";

const BREADCRUMBS = ({ href, label }: IBreadcrumb): IBreadcrumb[] => {
  return [
    {
      href: dashboardMeta.href,
      label: dashboardMeta.label.singular,
    },
    {
      href: landingPageTypeMeta.href,
      label: capitalizeFirstLetter(landingPageTypeMeta.label.plural),
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

  const landingPageTypeHref = `${landingPageTypeMeta.href}/${landingPageTypeId}`;

  await redirectUser(landingPageTypeHref);

  const landingPageType = await getLandingPageTypeBySlug(landingPageTypeId);

  if (!landingPageType) notFound();

  return (
    <PageStructure>
      <PageBreadcrumbs
        crumbs={BREADCRUMBS({
          href: landingPageTypeHref,
          label: "Edit " + landingPageType.name,
        })}
      />
      <PageTtle
        label={`Edit "${landingPageType?.name}"`}
        backBtnHref={landingPageTypeHref}
      />

      <LandingPageTypeEditForm landingPageType={landingPageType} />
    </PageStructure>
  );
};

export default EditLandingPageTypePage;
