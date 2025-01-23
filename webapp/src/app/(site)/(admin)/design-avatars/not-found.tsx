import { NotFoundComponent } from "@/components/not-found-component";
import { designAvatarsMeta } from "@/constants/page-titles/design-avatars";

export default async function NotFound() {
  return (
    <NotFoundComponent
      resource={designAvatarsMeta.label.singular}
      linkHref={designAvatarsMeta.href}
    />
  );
}
