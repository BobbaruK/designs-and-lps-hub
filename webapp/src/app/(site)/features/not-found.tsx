import { NotFoundComponent } from "@/components/not-found-component";
import { featuresTypeMeta } from "@/constants/page-titles/features";

export default async function NotFound() {
  return (
    <NotFoundComponent
      resource={featuresTypeMeta.label.singular.toLowerCase()}
      linkHref={featuresTypeMeta.href}
    />
  );
}
