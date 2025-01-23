import { NotFoundComponent } from "@/components/not-found-component";
import { usersMeta } from "@/constants/page-titles/users";

export default async function NotFound() {
  return (
    <NotFoundComponent
      resource={usersMeta.label.singular}
      linkHref={usersMeta.href}
    />
  );
}
