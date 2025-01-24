import { NotFoundComponent } from "@/components/not-found-component";
import { licensesMeta } from "@/constants/page-titles/licenses";

export default async function NotFound() {
  return (
    <NotFoundComponent
      resource={licensesMeta.label.singular}
      customMsg="The profile you are looking for does not exist anymore."
    />
  );
}
