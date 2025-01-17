import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { FlagEditForm } from "@/features/flags/components/form/flag-edit";
import { getFlagById } from "@/features/flags/data/get-flag";
import { IBreadcrumb } from "@/types";
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

  const BREADCRUMBS: IBreadcrumb[] = [
    {
      href: "/dashboard",
      label: "Home",
    },
    {
      label: "Admin",
    },
    {
      href: "/flags",
      label: "Flags",
    },
    {
      href: `/flags/${flagId}`,
      label: flag?.name || "Flag Unknown",
    },
  ];

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTtle label={`Edit Flag "${flag.name}"`} backBtnHref="/flags" />

      <FlagEditForm flag={flag} />
    </PageStructure>
  );
};

export default FlagPage;
