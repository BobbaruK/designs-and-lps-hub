import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { designAvatarsMeta } from "@/constants/page-titles/design-avatars";
import { DesignAvatarEditForm } from "@/features/design-avatars/components/form/design-avatar-edit";
import { getDesignAvatarById } from "@/features/design-avatars/data/get-design-avatar";
import { breadCrumbsFn } from "@/lib/breadcrumbs";
import { notFound } from "next/navigation";

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
        crumbs={breadCrumbsFn([
          {
            label: "Admin",
          },
          {
            href: designAvatarsMeta.href,
            label: designAvatarsMeta.label.plural,
          },
          {
            href: designAvatarsMeta.href,
            label: "Edit " + designAvatar.name,
          },
        ])}
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
