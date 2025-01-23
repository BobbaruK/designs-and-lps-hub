import { NotFoundComponent } from "@/components/not-found-component";
import { userAvatarMeta } from "@/constants/page-titles/user-avatars";

export default async function NotFound() {
  return (
    <NotFoundComponent
      resource={userAvatarMeta.label.singular}
      linkHref={userAvatarMeta.href}
    />
  );
}
