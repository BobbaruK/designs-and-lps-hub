import { NotFoundComponent } from "@/components/not-found-component";
import { landingPageTypeMeta } from "@/constants/page-titles/landing-page-type";

export default async function NotFound() {
  return (
    <NotFoundComponent
      resource={landingPageTypeMeta.label.singular}
      linkHref={landingPageTypeMeta.href}
    />
  );
}
