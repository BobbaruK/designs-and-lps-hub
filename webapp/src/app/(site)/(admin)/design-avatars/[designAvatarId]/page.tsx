import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { dashboardMeta } from "@/constants/page-titles/dashboard";
import { designAvatarsMeta } from "@/constants/page-titles/design-avatars";
import { DesignAvatarEditForm } from "@/features/design-avatars/components/form/design-avatar-edit";
import { getDesignAvatarById } from "@/features/design-avatars/data/get-design-avatar";
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
      href: designAvatarsMeta.href,
      label: designAvatarsMeta.label.plural,
    },
    {
      href,
      label,
    },
  ];
};

interface Props {
  params: Promise<{
    designAvatarId: string;
  }>;
}

const DesignAvatarPage = async ({ params }: Props) => {
  const { designAvatarId } = await params;

  const designAvatar = await getDesignAvatarById(designAvatarId);

  if (!designAvatar) notFound();

  return (
    <PageStructure>
      <PageBreadcrumbs
        crumbs={BREADCRUMBS({
          href: designAvatarsMeta.href,
          label: "Edit " + designAvatar.name,
        })}
      />
      <PageTtle
        label={`Edit "${designAvatar.name}"`}
        backBtnHref={designAvatarsMeta.href}
      />
      <DesignAvatarEditForm designAvatar={designAvatar} />
    </PageStructure>
  );
};

export default DesignAvatarPage;
