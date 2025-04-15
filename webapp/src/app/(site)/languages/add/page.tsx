import { CustomAlert } from "@/components/custom-alert";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTitle } from "@/components/page-title";
import { ACTION_MESSAGES } from "@/constants/messages";
import { flagsMeta } from "@/constants/page-titles/flags";
import { languagesMeta } from "@/constants/page-titles/languages";
import { getFlags } from "@/features/flags/data/get-flags";
import { LanguageAddForm } from "@/features/languages/components/form/language-add";
import { breadCrumbsFn } from "@/lib/breadcrumbs";
import { redirectUser } from "@/lib/redirect-user";
import { capitalizeFirstLetter } from "@/lib/utils";
import { IBreadcrumb } from "@/types/breadcrumb";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: languagesMeta.href,
    label: capitalizeFirstLetter(languagesMeta.label.plural),
  },
  {
    href: `${languagesMeta.href}/add`,
    label: `Add ${languagesMeta.label.singular.toLowerCase()}`,
  },
];

const AddLanguagePage = async () => {
  await redirectUser(languagesMeta.href);

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
      <PageBreadcrumbs crumbs={breadCrumbsFn(BREADCRUMBS)} />
      <PageTitle
        label={`Add ${languagesMeta.label.singular.toLowerCase()}`}
        backBtnHref={languagesMeta.href}
      />

      <LanguageAddForm flags={flags} />
    </PageStructure>
  );
};

export default AddLanguagePage;
