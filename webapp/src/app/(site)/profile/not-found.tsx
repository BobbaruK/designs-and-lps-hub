import { NotFoundComponent } from "@/components/not-found-component";

export default async function NotFound() {
  return (
    <NotFoundComponent
      resource="profile"
      customMsg="The profile you are looking for does not exists anymore."
    />
  );
}
