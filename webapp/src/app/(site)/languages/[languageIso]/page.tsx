import { DataTable } from "@/components/data-table";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { columns } from "@/features/landing-pages/components/table/landing-page-columns";
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

const LicensePage = async ({ params }: Props) => {
  const { languageIso } = await params;

  const language = await getLanguageByIso(languageIso);

  if (!language) notFound();

  return (
    <PageStructure>
      <PageBreadcrumbs
        crumbs={BREADCRUMBS({
          href: `/languages/${language.iso_639_1}`,
          label: language.englishName,
        })}
      />
      <PageTtle
        label={language.englishName}
        backBtnHref="/languages"
        editBtnHref={`/languages/${language.iso_639_1}/edit`}
      />

      <p>
        {language.name} / {language.iso_639_1}
        {language.iso_3166_1 && "-" + language.iso_3166_1}
      </p>

      <section>
        <h2 className="text-heading4">Landing pages</h2>
        <DataTable
          columns={columns}
          data={language.landingPages}
          columnVisibilityObj={{
            slug: false,
            fxoroFooter: false,
            requester: false,
            language: false,
            createdAt: false,
            createdBy: false,
            updatedAt: false,
            updatedBy: false,
          }}
        />
      </section>
    </PageStructure>
  );
};

export default LicensePage;
