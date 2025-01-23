import { NotFoundComponent } from "@/components/not-found-component";
import { designsMeta } from "@/constants/page-titles/designs";

export default async function NotFound() {
  return (
    <NotFoundComponent
      resource={designsMeta.label.singular}
      linkHref={designsMeta.href}
    />
  );
}
