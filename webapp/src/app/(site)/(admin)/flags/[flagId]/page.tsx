import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { dashboardMeta } from "@/constants/page-titles/dashboard";
import { flagsMeta } from "@/constants/page-titles/flags";
import { FlagEditForm } from "@/features/flags/components/form/flag-edit";
import { getFlagById } from "@/features/flags/data/get-flag";
import { IBreadcrumb } from "@/types/breadcrumb";
import { notFound } from "next/navigation";

const BREADCRUMBS = ({ href, label }: IBreadcrumb): IBreadcrumb[] => {
  return [
    {
      href: dashboardMeta.href,
      label: dashboardMeta.label.singular,
    },
    {
      label: "Admin",
    },
    {
      href: flagsMeta.href,
      label: flagsMeta.label.plural,
    },
    {
      href,
      label,
    },
  ];
};

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
        crumbs={BREADCRUMBS({
          href: flagsMeta.href,
          label: "Edit " + flag.name,
        })}
      />
      <PageTtle label={`Edit "${flag.name}"`} backBtnHref={flagsMeta.href} />

      <FlagEditForm flag={flag} />
    </PageStructure>
  );
};

export default FlagPage;
