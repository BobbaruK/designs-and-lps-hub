import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { DesignAvatarEditForm } from "@/features/design-avatars/components/form/design-avatar-edit";
import { getDesignAvatarById } from "@/features/design-avatars/data/get-design-avatar";
import { IBreadcrumb } from "@/types/breadcrumb";
import { notFound } from "next/navigation";

const BREADCRUMBS = ({ href, label }: IBreadcrumb): IBreadcrumb[] => {
  return [
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
          href: `/design-avatars/${designAvatar.id}`,
          label: designAvatar.name,
        })}
      />
      <PageTtle
        label={`Edit Design Avatar "${designAvatar.name}"`}
        backBtnHref="/design-avatars"
      />
      <DesignAvatarEditForm designAvatar={designAvatar} />
    </PageStructure>
  );
};

export default DesignAvatarPage;
