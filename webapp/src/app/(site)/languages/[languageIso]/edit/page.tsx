import { CustomAlert } from "@/components/custom-alert";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { ACTION_MESSAGES } from "@/constants/messages";
import { getFlags } from "@/features/flags/data/get-flags";
import { LanguageEditForm } from "@/features/languages/components/form/language-edit";
import { getLanguageByIso } from "@/features/languages/data/get-language";
import { IBreadcrumb } from "@/types/breadcrumb";
import { notFound } from "next/navigation";

const BREADCRUMBS = ({ href, label }: IBreadcrumb): IBreadcrumb[] => {
  return [
    {
      href: "/dashboard",
      label: "Home",
    },
    {
      href: "/languages",
      label: "Languages",
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

  const language = await getLanguageByIso(languageIso);

  if (!language) notFound();

  const flags = await getFlags();

  if (!flags)
    return (
      <CustomAlert
        title={"Error!"}
        description={ACTION_MESSAGES("Flags").CUSTOM_ALERT}
        variant="destructive"
      />
    );

  return (
    <PageStructure>
      <PageBreadcrumbs
        crumbs={BREADCRUMBS({
          href: `/languages/${language.iso_639_1}`,
          label: "Edit " + language.englishName,
        })}
      />
      <PageTtle
        label={`Edit "${language?.englishName}"`}
        backBtnHref={`/languages/${language.iso_639_1}`}
      />

      <LanguageEditForm language={language} flags={flags} />
    </PageStructure>
  );
};

export default EditLicensePage;
