import { CustomAlert } from "@/components/custom-alert";
import { DataTable } from "@/components/data-table";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { ACTION_MESSAGES } from "@/constants/messages";
import { dashboardMeta } from "@/constants/page-titles/dashboard";
import { languagesMeta } from "@/constants/page-titles/languages";
import { columns } from "@/features/languages/components/table/columns";
import { getLanguages } from "@/features/languages/data/get-languages";
import { IBreadcrumb } from "@/types/breadcrumb";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: dashboardMeta.href,
    label: dashboardMeta.label.singular,
  },
  {
    href: languagesMeta.href,
    label: languagesMeta.label.plural,
  },
];

const LanguagesPage = async () => {
  const languages = await getLanguages();

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTtle
        label={languagesMeta.label.plural}
        addBtnHref={`${languagesMeta.href}/add`}
      />
      {!languages ? (
        <CustomAlert
          title={"Error!"}
          description={ACTION_MESSAGES(languagesMeta.label.plural).CUSTOM_ALERT}
          variant="destructive"
        />
      ) : (
        <DataTable
          columns={columns}
          data={languages}
          columnVisibilityObj={{}}
        />
      )}
    </PageStructure>
  );
};

export default LanguagesPage;
