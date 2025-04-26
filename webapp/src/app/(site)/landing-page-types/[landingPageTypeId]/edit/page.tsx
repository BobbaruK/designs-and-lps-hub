import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTitle } from "@/components/page-title";
import { landingPageTypeMeta } from "@/constants/page-titles/landing-page-type";
import { LandingPageTypeEditForm } from "@/features/landing-page-types/components/form/landing-page-type-edit";
import { getLandingPageTypeBySlug } from "@/features/landing-page-types/data/get-landing-page-type";
import { breadCrumbsFn } from "@/lib/breadcrumbs";
import { redirectUser } from "@/lib/redirect-user";
import { capitalizeFirstLetter } from "@/lib/utils";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    landingPageTypeId: string;
  }>;
}

const EditLandingPageTypePage = async ({ params }: Props) => {
  const { landingPageTypeId } = await params;

  const landingPageTypeHref = `${landingPageTypeMeta.href}/${landingPageTypeId}`;

  await redirectUser(landingPageTypeHref);

  const landingPageType = await getLandingPageTypeBySlug({
    slug: landingPageTypeId,
  });

  if (!landingPageType) notFound();

  return (
    <PageStructure>
      <PageBreadcrumbs
        crumbs={breadCrumbsFn([
          {
            href: landingPageTypeMeta.href,
            label: capitalizeFirstLetter(landingPageTypeMeta.label.plural),
          },
          {
            href: landingPageTypeHref,
            label: `Edit ${landingPageTypeMeta.label.singular.toLowerCase()} "${landingPageType.name}"`,
          },
        ])}
      />
      <PageTitle
        label={`Edit ${landingPageTypeMeta.label.singular.toLowerCase()} "${landingPageType.name}"`}
        backBtnHref={landingPageTypeHref}
      />

      <LandingPageTypeEditForm landingPageType={landingPageType} />
    </PageStructure>
  );
};

export default EditLandingPageTypePage;
