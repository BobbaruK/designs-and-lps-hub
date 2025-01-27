import { CustomAlert } from "@/components/custom-alert";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { ACTION_MESSAGES } from "@/constants/messages";
import { brandsMeta } from "@/constants/page-titles/brands";
import { dashboardMeta } from "@/constants/page-titles/dashboard";
import { designsMeta } from "@/constants/page-titles/designs";
import { formValidationsMeta } from "@/constants/page-titles/form-validations";
import { landingPageTypeMeta } from "@/constants/page-titles/landing-page-type";
import { landingPagesMeta } from "@/constants/page-titles/landing-pages";
import { languagesMeta } from "@/constants/page-titles/languages";
import { licensesMeta } from "@/constants/page-titles/licenses";
import { topicsMeta } from "@/constants/page-titles/topics";
import { usersMeta } from "@/constants/page-titles/users";
import { getBrands } from "@/features/brands/data/get-brands";
import { getDesigns } from "@/features/designs/data/get-designs";
import { getFormValidations } from "@/features/form-validations/data/get-form-validations";
import { getLandingPageTypes } from "@/features/landing-page-types/data/get-landing-page-types";
import { LandingPageAddForm } from "@/features/landing-pages/components/form/landing-page-add";
import { getLanguages } from "@/features/languages/data/get-languages";
import { getLicenses } from "@/features/licenses/data/get-licenses";
import { getTopics } from "@/features/topics/data/get-topics";
import { getUsers } from "@/features/users/data/get-user";
import { redirectUser } from "@/lib/redirect-user";
import { IBreadcrumb } from "@/types/breadcrumb";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: dashboardMeta.href,
    label: dashboardMeta.label.singular,
  },
  {
    href: landingPagesMeta.href,
    label: landingPagesMeta.label.plural,
  },
  {
    href: `${landingPagesMeta.href}/add`,
    label: `Add ${landingPagesMeta.label.singular}`,
  },
];

const AddLandingPagePage = async () => {
  await redirectUser(landingPagesMeta.href);
  //
  const users = await getUsers();
  if (!users)
    return (
      <CustomAlert
        title={"Error!"}
        description={ACTION_MESSAGES(usersMeta.label.plural).CUSTOM_ALERT}
        variant="destructive"
      />
    );

  //
  const designs = await getDesigns();
  if (!designs)
    return (
      <CustomAlert
        title={"Error!"}
        description={ACTION_MESSAGES(designsMeta.label.plural).CUSTOM_ALERT}
        variant="destructive"
      />
    );

  //
  const formValidations = await getFormValidations();
  if (!formValidations)
    return (
      <CustomAlert
        title={"Error!"}
        description={ACTION_MESSAGES(formValidationsMeta.label.plural).CUSTOM_ALERT}
        variant="destructive"
      />
    );

  //
  const licenses = await getLicenses();
  if (!licenses)
    return (
      <CustomAlert
        title={"Error!"}
        description={ACTION_MESSAGES(licensesMeta.label.plural).CUSTOM_ALERT}
        variant="destructive"
      />
    );

  //
  const landingPageTypes = await getLandingPageTypes();
  if (!landingPageTypes)
    return (
      <CustomAlert
        title={"Error!"}
        description={ACTION_MESSAGES(landingPageTypeMeta.label.plural).CUSTOM_ALERT}
        variant="destructive"
      />
    );

  //
  const languages = await getLanguages();
  if (!languages)
    return (
      <CustomAlert
        title={"Error!"}
        description={ACTION_MESSAGES(languagesMeta.label.plural).CUSTOM_ALERT}
        variant="destructive"
      />
    );

  //
  const brands = await getBrands();
  if (!brands)
    return (
      <CustomAlert
        title={"Error!"}
        description={ACTION_MESSAGES(brandsMeta.label.plural).CUSTOM_ALERT}
        variant="destructive"
      />
    );

  //
  const topics = await getTopics();
  if (!topics)
    return (
      <CustomAlert
        title={"Error!"}
        description={ACTION_MESSAGES(topicsMeta.label.plural).CUSTOM_ALERT}
        variant="destructive"
      />
    );

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTtle
        label={`Add ${landingPagesMeta.label.singular}`}
        backBtnHref={landingPagesMeta.href}
      />

      <LandingPageAddForm
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

export default AddLandingPagePage;
