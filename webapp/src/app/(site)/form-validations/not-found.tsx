import { NotFoundComponent } from "@/components/not-found-component";
import { formValidationsMeta } from "@/constants/page-titles/form-validations";

export default async function NotFound() {
  return (
    <NotFoundComponent
      resource={formValidationsMeta.label.singular}
      linkHref={formValidationsMeta.href}
    />
  );
}
