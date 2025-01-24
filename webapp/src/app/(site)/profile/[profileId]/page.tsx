import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { dashboardMeta } from "@/constants/page-titles/dashboard";
import { profileMeta } from "@/constants/page-titles/profile";
import { currentUser } from "@/features/auth/lib/auth";
import { UserDataSection } from "@/features/profile/components/user-data-section";
import { getUserById } from "@/features/users/data/get-user";
import { IBreadcrumb } from "@/types/breadcrumb";
import { UserRole } from "@prisma/client";
import { notFound } from "next/navigation";

const BREADCRUMBS = ({ href, label }: IBreadcrumb): IBreadcrumb[] => {
  return [
    {
      href: dashboardMeta.href,
      label: dashboardMeta.label.singular,
    },
    {
      label: profileMeta.label.singular,
    },
    {
      href,
      label,
    },
  ];
};

interface Props {
  params: Promise<{
    profileId: string;
  }>;
}

const ProfilePage = async ({ params }: Props) => {
  const { profileId } = await params;

  const sessionUser = await currentUser();

  const user = await getUserById(profileId);

  if (!user) notFound();

  return (
    <PageStructure>
      <PageBreadcrumbs
        crumbs={BREADCRUMBS({
          label: user.name,
          href: `/profile/${user.id}`,
        })}
      />
      <PageTtle
        label={user.name}
        editBtnHref={
          sessionUser?.role === UserRole.ADMIN ? `/users/${user.id}` : undefined
        }
      />
      <UserDataSection user={user} />
    </PageStructure>
  );
};

export default ProfilePage;
