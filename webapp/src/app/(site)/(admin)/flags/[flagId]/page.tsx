import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTitle } from "@/components/page-title";
import { flagsMeta } from "@/constants/page-titles/flags";
import { FlagEditForm } from "@/features/flags/components/form/flag-edit";
import { getFlagById } from "@/features/flags/data/get-flag";
import { breadCrumbsFn } from "@/lib/breadcrumbs";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    flagId: string;
  }>;
}

const FlagPage = async ({ params }: Props) => {
  const { flagId } = await params;

  const flag = await getFlagById(flagId);

  if (!flag) notFound();

  return (
    <PageStructure>
      <PageBreadcrumbs
        crumbs={breadCrumbsFn([
          {
            label: "Admin",
          },
          {
            href: flagsMeta.href,
            label: flagsMeta.label.plural,
          },
          {
            href: flagsMeta.href,
            label: "Edit " + flag.name,
          },
        ])}
      />
      <PageTitle label={`Edit "${flag.name}"`} backBtnHref={flagsMeta.href} />

      <FlagEditForm flag={flag} />
    </PageStructure>
  );
};

export default FlagPage;
