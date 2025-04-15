import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTitle } from "@/components/page-title";
import { registrationTypesMeta } from "@/constants/page-titles/registration-types";
import { RegistrationTypeEditForm } from "@/features/registration-types/components/form/registration-type-edit";
import { getRegistrationTypeBySlug } from "@/features/registration-types/data/get-registration-type";
import { breadCrumbsFn } from "@/lib/breadcrumbs";
import { redirectUser } from "@/lib/redirect-user";
import { capitalizeFirstLetter } from "@/lib/utils";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    registrationTypeId: string;
  }>;
}

const EditregistrationTypePage = async ({ params }: Props) => {
  const { registrationTypeId } = await params;

  const registrationTypeHref = `${registrationTypesMeta.href}/${registrationTypeId}`;

  await redirectUser(registrationTypeHref);

  const registrationType = await getRegistrationTypeBySlug(registrationTypeId);

  if (!registrationType) notFound();

  return (
    <PageStructure>
      <PageBreadcrumbs
        crumbs={breadCrumbsFn([
          {
            href: registrationTypesMeta.href,
            label: capitalizeFirstLetter(registrationTypesMeta.label.plural),
          },
          {
            href: registrationTypeHref,
            label: `Edit ${registrationTypesMeta.label.singular.toLowerCase()} "${registrationType.name}"`,
          },
        ])}
      />
      <PageTitle
        label={`Edit ${registrationTypesMeta.label.singular.toLowerCase()} "${registrationType.name}"`}
        backBtnHref={registrationTypeHref}
      />

      <RegistrationTypeEditForm registrationType={registrationType} />
    </PageStructure>
  );
};

export default EditregistrationTypePage;
