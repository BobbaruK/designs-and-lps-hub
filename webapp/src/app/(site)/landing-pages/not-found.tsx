import { NotFoundComponent } from "@/components/not-found-component";
import { landingPagesMeta } from "@/constants/page-titles/landing-pages";

export default async function NotFound() {
  return (
    <NotFoundComponent
      resource={landingPagesMeta.label.singular.toLowerCase()}
      linkHref={landingPagesMeta.href}
    />
  );
}
