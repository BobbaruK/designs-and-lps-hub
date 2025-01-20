import { CustomAlert } from "@/components/custom-alert";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { ACTION_MESSAGES } from "@/constants/messages";
import { getFlags } from "@/features/flags/data/get-flags";
import { LanguageAddForm } from "@/features/languages/components/form/language-add";
import { IBreadcrumb } from "@/types/breadcrumb";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: "/dashboard",
    label: "Home",
  },
  {
    href: "/languages",
    label: "Languages",
  },
  {
    href: "/languages/add",
    label: "Add Language",
  },
];

const AddLanguagePage = async () => {
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
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTtle label="Add Language" backBtnHref="/languages" />

      <LanguageAddForm flags={flags} />
    </PageStructure>
  );
};

export default AddLanguagePage;
