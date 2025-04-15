import { CustomAlert } from "@/components/custom-alert";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTitle } from "@/components/page-title";
import { ACTION_MESSAGES } from "@/constants/messages";
import { flagsMeta } from "@/constants/page-titles/flags";
import { languagesMeta } from "@/constants/page-titles/languages";
import { getFlags } from "@/features/flags/data/get-flags";
import { LanguageEditForm } from "@/features/languages/components/form/language-edit";
import { getLanguageByIso } from "@/features/languages/data/get-language";
import { breadCrumbsFn } from "@/lib/breadcrumbs";
import { redirectUser } from "@/lib/redirect-user";
import { capitalizeFirstLetter } from "@/lib/utils";
import { IBreadcrumb } from "@/types/breadcrumb";
import { notFound } from "next/navigation";

const BREADCRUMBS = ({ href, label }: IBreadcrumb): IBreadcrumb[] => {
  return [
    {
      href: languagesMeta.href,
      label: capitalizeFirstLetter(languagesMeta.label.plural),
    },
    {
      href,
      label,
    },
  ];
};

interface Props {
  params: Promise<{
    languageIso: string;
  }>;
}

const EditLicensePage = async ({ params }: Props) => {
  const { languageIso } = await params;

  const landingPageTypeHref = `${languagesMeta.href}/${languageIso}`;

  await redirectUser(landingPageTypeHref);

  const language = await getLanguageByIso(languageIso);

  if (!language) notFound();

  const flags = await getFlags();

  if (!flags)
    return (
      <CustomAlert
        title={"Error!"}
        description={ACTION_MESSAGES(flagsMeta.label.plural).CUSTOM_ALERT}
        variant="destructive"
      />
    );

  return (
    <PageStructure>
      <PageBreadcrumbs
        crumbs={breadCrumbsFn(
          BREADCRUMBS({
            href: landingPageTypeHref,
            label: `Edit ${languagesMeta.label.singular.toLowerCase()} "${language.englishName}"`,
          }),
        )}
      />
      <PageTitle
        label={`Edit ${languagesMeta.label.singular.toLowerCase()} "${language.englishName}"`}
        backBtnHref={landingPageTypeHref}
      />

      <LanguageEditForm language={language} flags={flags} />
    </PageStructure>
  );
};

export default EditLicensePage;
