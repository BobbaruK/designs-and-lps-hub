import { NotFoundComponent } from "@/components/not-found-component";
import { topicsMeta } from "@/constants/page-titles/topics";

export default async function NotFound() {
  return (
    <NotFoundComponent
      resource={topicsMeta.label.singular.toLowerCase()}
      linkHref={topicsMeta.href}
    />
  );
}
