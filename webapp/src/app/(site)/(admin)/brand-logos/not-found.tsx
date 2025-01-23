import { NotFoundComponent } from "@/components/not-found-component";
import { brandLogosMeta } from "@/constants/page-titles/brand-logos";

export default async function NotFound() {
  return (
    <NotFoundComponent
      resource={brandLogosMeta.label.singular}
      linkHref={brandLogosMeta.href}
    />
  );
}
