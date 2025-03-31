import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { dashboardMeta } from "@/constants/page-titles/dashboard";
import { registrationTypesMeta } from "@/constants/page-titles/registration-types";
import { RegistrationTypeEditForm } from "@/features/registration-types/components/form/registration-type-edit";
import { getRegistrationTypeBySlug } from "@/features/registration-types/data/get-registration-type";
import { redirectUser } from "@/lib/redirect-user";
import { capitalizeFirstLetter } from "@/lib/utils";
import { IBreadcrumb } from "@/types/breadcrumb";
import { notFound } from "next/navigation";

const BREADCRUMBS = ({ href, label }: IBreadcrumb): IBreadcrumb[] => {
  return [
    {
      href: dashboardMeta.href,
      label: dashboardMeta.label.singular,
    },
    {
      href: registrationTypesMeta.href,
      label: capitalizeFirstLetter(registrationTypesMeta.label.plural),
    },
    {
      href,
      label,
    },
  ];
};

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
        crumbs={BREADCRUMBS({
          href: registrationTypeHref,
          label: `Edit ${registrationTypesMeta.label.singular.toLowerCase()} "${registrationType.name}"`,
        })}
      />
      <PageTtle
        label={`Edit ${registrationTypesMeta.label.singular.toLowerCase()} "${registrationType.name}"`}
        backBtnHref={registrationTypeHref}
      />

      <RegistrationTypeEditForm registrationType={registrationType} />
    </PageStructure>
  );
};

export default EditregistrationTypePage;
