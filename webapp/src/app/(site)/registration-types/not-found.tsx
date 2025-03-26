import { NotFoundComponent } from "@/components/not-found-component";
import { registrationTypesMeta } from "@/constants/page-titles/registration-types";

export default async function NotFound() {
  return (
    <NotFoundComponent
      resource={registrationTypesMeta.label.singular}
      linkHref={registrationTypesMeta.href}
    />
  );
}
