import { CustomAlert } from "@/components/custom-alert";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { ACTION_MESSAGES } from "@/constants/messages";
import { dashboardMeta } from "@/constants/page-titles/dashboard";
import { landingPagesMeta } from "@/constants/page-titles/landing-pages";
import { getBrands } from "@/features/brands/data/get-brands";
import { getDesigns } from "@/features/designs/data/get-designs";
import { getFormValidations } from "@/features/form-validations/data/get-form-validations";
import { getLandingPageTypes } from "@/features/landing-page-types/data/get-landing-page-types";
import { LandingPageEditForm } from "@/features/landing-pages/components/form/landing-page-edit";
import { getLandingPageBySlug } from "@/features/landing-pages/data/get-landing-page";
import { getLanguages } from "@/features/languages/data/get-languages";
import { getLicenses } from "@/features/licenses/data/get-licenses";
import { getTopics } from "@/features/topics/data/get-topics";
import { getUsers } from "@/features/users/data/get-user";
import { redirectUser } from "@/lib/redirect-user";
import { IBreadcrumb } from "@/types/breadcrumb";
import { notFound } from "next/navigation";

const BREADCRUMBS = ({ href, label }: IBreadcrumb): IBreadcrumb[] => {
  return [
    {
      href: dashboardMeta.href,
      label: dashboardMeta.label.singular,
    },
    {
      href: landingPagesMeta.href,
      label: landingPagesMeta.label.plural,
    },
    {
      href,
      label,
    },
  ];
};

interface Props {
  params: Promise<{
    landingPageId: string;
  }>;
}

const EditLandingPagePage = async ({ params }: Props) => {
  const { landingPageId } = await params;

  const landingPageHref = `${landingPagesMeta.href}/${landingPageId}`;

  await redirectUser(landingPageHref);

  const landingPage = await getLandingPageBySlug(landingPageId);

  if (!landingPage) notFound();

  //
  const users = await getUsers();
  if (!users)
    return (
      <CustomAlert
        title={"Error!"}
        description={ACTION_MESSAGES("Users").CUSTOM_ALERT}
        variant="destructive"
      />
    );

  //
  const designs = await getDesigns();
  if (!designs)
    return (
      <CustomAlert
        title={"Error!"}
        description={ACTION_MESSAGES("Designs").CUSTOM_ALERT}
        variant="destructive"
      />
    );

  //
  const formValidations = await getFormValidations();
  if (!formValidations)
    return (
      <CustomAlert
        title={"Error!"}
        description={ACTION_MESSAGES("Form Validations").CUSTOM_ALERT}
        variant="destructive"
      />
    );

  //
  const licenses = await getLicenses();
  if (!licenses)
    return (
      <CustomAlert
        title={"Error!"}
        description={ACTION_MESSAGES("Licenses").CUSTOM_ALERT}
        variant="destructive"
      />
    );

  //
  const landingPageTypes = await getLandingPageTypes();
  if (!landingPageTypes)
    return (
      <CustomAlert
        title={"Error!"}
        description={ACTION_MESSAGES("Landing Page Types").CUSTOM_ALERT}
        variant="destructive"
      />
    );

  //
  const languages = await getLanguages();
  if (!languages)
    return (
      <CustomAlert
        title={"Error!"}
        description={ACTION_MESSAGES("Languages").CUSTOM_ALERT}
        variant="destructive"
      />
    );

  //
  const brands = await getBrands();
  if (!brands)
    return (
      <CustomAlert
        title={"Error!"}
        description={ACTION_MESSAGES("Brands").CUSTOM_ALERT}
        variant="destructive"
      />
    );

  //
  const topics = await getTopics();
  if (!topics)
    return (
      <CustomAlert
        title={"Error!"}
        description={ACTION_MESSAGES("Topics").CUSTOM_ALERT}
        variant="destructive"
      />
    );

  return (
    <PageStructure>
      <PageBreadcrumbs
        crumbs={BREADCRUMBS({
          href: landingPageHref,
          label: "Edit " + landingPage.name,
        })}
      />
      <PageTtle
        label={`Edit "${landingPage.name}"`}
        backBtnHref={landingPageHref}
      />

      <LandingPageEditForm
        landingPage={landingPage}
        users={users}
        designs={designs}
        formValidations={formValidations}
        licenses={licenses}
        landingPageTypes={landingPageTypes}
        languages={languages}
        brands={brands}
        topics={topics}
      />
    </PageStructure>
  );
};

export default EditLandingPagePage;
