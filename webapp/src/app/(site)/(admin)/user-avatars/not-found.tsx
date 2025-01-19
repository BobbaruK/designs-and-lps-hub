import { NotFoundComponent } from "@/components/not-found-component";

export default async function NotFound() {
  return <NotFoundComponent resource="User Avatar" linkHref="/user-avatars" />;
}