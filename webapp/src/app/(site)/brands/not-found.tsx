import { NotFoundComponent } from "@/components/not-found-component";

export default async function NotFound() {
  return <NotFoundComponent resource="Brand" linkHref="/brands" />;
}
