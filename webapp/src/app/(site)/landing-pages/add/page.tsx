import { CustomAlert } from "@/components/custom-alert";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTitle } from "@/components/page-title";
import { loadSearchParams } from "@/components/search-params";
import { Option } from "@/components/ui/expansions/multiple-selector";
import { ACTION_MESSAGES } from "@/constants/messages";
import { brandsMeta } from "@/constants/page-titles/brands";
import { designsMeta } from "@/constants/page-titles/designs";
import { featuresTypeMeta } from "@/constants/page-titles/features";
import { landingPageTypeMeta } from "@/constants/page-titles/landing-page-type";
import { landingPagesMeta } from "@/constants/page-titles/landing-pages";
import { languagesMeta } from "@/constants/page-titles/languages";
import { licensesMeta } from "@/constants/page-titles/licenses";
import { registrationTypesMeta } from "@/constants/page-titles/registration-types";
import { topicsMeta } from "@/constants/page-titles/topics";
import { usersMeta } from "@/constants/page-titles/users";
import { getBrands } from "@/features/brands/data/get-brands";
import { getDesigns } from "@/features/designs/data/get-designs";
import { getLandingPageFeatures } from "@/features/landing-page-features/data/get-landing-page-features";
import { getLandingPageTypes } from "@/features/landing-page-types/data/get-landing-page-types";
import { LandingPageAddForm } from "@/features/landing-pages/components/form/landing-page-add";
import { getLandingPage } from "@/features/landing-pages/data/get-landing-page";
import { getLanguages } from "@/features/languages/data/get-languages";
import { getLicenses } from "@/features/licenses/data/get-licenses";
import { getRegistrationTypes } from "@/features/registration-types/data/get-registration-types";
import { getTopics } from "@/features/topics/data/get-topics";
import { getUsers } from "@/features/users/data/get-user";
import { breadCrumbsFn } from "@/lib/breadcrumbs";
import { redirectUser } from "@/lib/redirect-user";
import { capitalizeFirstLetter } from "@/lib/utils";
import { IBreadcrumb } from "@/types/breadcrumb";
import { SearchParams } from "nuqs/server";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: landingPagesMeta.href,
    label: capitalizeFirstLetter(landingPagesMeta.label.plural),
  },
  {
    href: `${landingPagesMeta.href}/add`,
    label: `Add ${landingPagesMeta.label.singular.toLowerCase()}`,
  },
];

interface Props {
  searchParams: Promise<SearchParams>;
}

const AddLandingPagePage = async ({ searchParams }: Props) => {
  const { brand } = await loadSearchParams(searchParams);

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
  const designs = await getDesigns({});
  if (!designs)
    return (
      <CustomAlert
        title={"Error!"}
        description={ACTION_MESSAGES(designsMeta.label.plural).CUSTOM_ALERT}
        variant="destructive"
      />
    );

  //
  const registrationTypes = await getRegistrationTypes({});
  if (!registrationTypes)
    return (
      <CustomAlert
        title={"Error!"}
        description={
          ACTION_MESSAGES(registrationTypesMeta.label.plural).CUSTOM_ALERT
        }
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
        description={
          ACTION_MESSAGES(landingPageTypeMeta.label.plural).CUSTOM_ALERT
        }
        variant="destructive"
      />
    );

  //
  const languages = await getLanguages({});
  if (!languages)
    return (
      <CustomAlert
        title={"Error!"}
        description={ACTION_MESSAGES(languagesMeta.label.plural).CUSTOM_ALERT}
        variant="destructive"
      />
    );

  //
  const brands = await getBrands({});
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

  //
  const features = await getLandingPageFeatures({});
  if (!features)
    return (
      <CustomAlert
        title={"Error!"}
        description={
          ACTION_MESSAGES(featuresTypeMeta.label.plural).CUSTOM_ALERT
        }
        variant="destructive"
      />
    );

  const passFeat: Option[] = features.map((feature) => ({
    label: feature.name,
    value: feature.id,
  }));

  const homeLp = await getLandingPage({
    where: {
      brandId: brand ? brand[0] : "",
      isHome: true,
    },
  });

  // TODO: features that don't work with other features

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={breadCrumbsFn(BREADCRUMBS)} />
      <PageTitle
        label={`Add ${landingPagesMeta.label.singular.toLowerCase()}`}
        backBtnHref={landingPagesMeta.href}
      />

      <LandingPageAddForm
        users={users}
        designs={designs}
        registrationTypes={registrationTypes}
        licenses={licenses}
        landingPageTypes={landingPageTypes}
        languages={languages}
        brands={brands}
        topics={topics}
        features={passFeat}
        brandHasHome={homeLp ? true : false}
      />
    </PageStructure>
  );
};

export default AddLandingPagePage;
