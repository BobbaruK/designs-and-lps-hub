import { NotFoundComponent } from "@/components/not-found-component";
import { flagsMeta } from "@/constants/page-titles/flags";

export default async function NotFound() {
  return (
    <NotFoundComponent
      resource={flagsMeta.label.singular}
      linkHref={flagsMeta.href}
    />
  );
}
