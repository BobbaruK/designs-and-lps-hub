import { NotFoundComponent } from "@/components/not-found-component";
import { languagesMeta } from "@/constants/page-titles/languages";

export default async function NotFound() {
  return (
    <NotFoundComponent
      resource={languagesMeta.label.singular}
      linkHref={languagesMeta.href}
    />
  );
}
