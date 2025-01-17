import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { DesignAvatarEditForm } from "@/features/design-avatars/components/form/design-avatar-edit";
import { getDesignAvatarById } from "@/features/design-avatars/data/get-design-avatar";
import { IBreadcrumb } from "@/types";
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

  const BREADCRUMBS: IBreadcrumb[] = [
    {
      href: "/dashboard",
      label: "Home",
    },
    {
      label: "Admin",
    },
    {
      href: "/design-avatars",
      label: "Design Avatars",
    },
    {
      href: `/design-avatars/${designAvatarId}`,
      label: designAvatar?.name || "Design Avatar Unknown",
    },
  ];

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTtle
        label={`Edit Design Avatar "${designAvatar.name}"`}
        backBtnHref="/design-avatars"
      />
      <DesignAvatarEditForm designAvatar={designAvatar} />
    </PageStructure>
  );
};

export default DesignAvatarPage;
