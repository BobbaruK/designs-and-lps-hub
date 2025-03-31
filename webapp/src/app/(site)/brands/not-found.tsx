import { NotFoundComponent } from "@/components/not-found-component";
import { brandsMeta } from "@/constants/page-titles/brands";

export default async function NotFound() {
  return (
    <NotFoundComponent
      resource={brandsMeta.label.singular.toLowerCase()}
      linkHref={brandsMeta.href}
    />
  );
}
