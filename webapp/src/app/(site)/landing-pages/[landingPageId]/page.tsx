import { CopyToClipboard } from "@/components/copy-to-clipboard";
import { CustomAvatar } from "@/components/custom-avatar";
import { IconAstro } from "@/components/icons/astro";
import { IconClose } from "@/components/icons/close";
import { IconPickaxe } from "@/components/icons/pickaxe";
import { IconTraffic } from "@/components/icons/traffic";
import { IconWhatsapp } from "@/components/icons/whatsapp";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTitle } from "@/components/page-title";
import { SvgMask } from "@/components/svg-mask";
import { Badge } from "@/components/ui/badge";
import { landingPagesMeta } from "@/constants/page-titles/landing-pages";
import { registrationTypesMeta } from "@/constants/page-titles/registration-types";
import { getLandingPageBySlug } from "@/features/landing-pages/data/get-landing-page";
import { breadCrumbsFn } from "@/lib/breadcrumbs";
import { dateFormatter } from "@/lib/format-date";
import { capitalizeFirstLetter, cn } from "@/lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    landingPageId: string;
  }>;
}

const LandingPageTypePage = async ({ params }: Props) => {
  const { landingPageId } = await params;

  const landingPage = await getLandingPageBySlug(landingPageId);

  if (!landingPage) notFound();

  const landingPageHref = `${landingPagesMeta.href}/${landingPage.slug}`;

  return (
    <PageStructure>
      <PageBreadcrumbs
        crumbs={breadCrumbsFn([
          {
            href: landingPagesMeta.href,
            label: capitalizeFirstLetter(landingPagesMeta.label.plural),
          },
          {
            href: landingPagesMeta.href,
            label: landingPage.name,
          },
        ])}
      />
      <PageTitle
        label={landingPage?.name}
        backBtnHref={landingPagesMeta.href}
        editBtnHref={`${landingPageHref}/edit`}
      />

      <div className="@container">
        <div className="flex flex-col gap-4 @3xl:flex-row @3xl:gap-8">
          <div className="flex w-full flex-col items-center gap-6 @3xl:w-3/12">
            {landingPage.design?.slug && landingPage.avatar ? (
              <Link
                href={`/designs/${landingPage.design?.slug}`}
                className="w-full"
              >
                <CustomAvatar
                  image={landingPage.avatar.url}
                  className={cn(
                    "h-56 w-full rounded-md @3xl:h-44",
                    `${landingPage.isHome ? "shadow-xl shadow-info" : ""}`,
                  )}
                />
              </Link>
            ) : (
              <CustomAvatar
                image={landingPage.avatar?.url}
                className={cn(
                  "h-56 w-full rounded-md @3xl:h-44",
                  `${landingPage.isHome ? "shadow-xl shadow-info" : ""}`,
                )}
              />
            )}
            <div className="flex w-full flex-row flex-wrap justify-around gap-4">
              <Badge
                className="grid size-8 place-items-center rounded-full p-0"
                variant={"outline"}
              >
                <IconAstro isSuccess={landingPage.isARTS} />
              </Badge>

              <Badge
                className="grid size-8 place-items-center rounded-full p-0"
                variant={"outline"}
              >
                <IconWhatsapp isSuccess={landingPage.whatsapp} />
              </Badge>

              <Badge
                className="grid size-8 place-items-center rounded-full p-0"
                variant={"outline"}
              >
                <IconTraffic isSuccess={landingPage.isReadyForTraffic} />
              </Badge>

              <Badge
                className="grid size-8 place-items-center rounded-full p-0"
                variant={"outline"}
              >
                <IconPickaxe isSuccess={landingPage.isUnderMaintenance} />
              </Badge>
            </div>
          </div>

          <div className="flex flex-col gap-4 @3xl:w-9/12">
            <div className="grid grid-cols-[100px_minmax(0,_1fr)] gap-x-2 gap-y-4 @md:grid-cols-[150px_minmax(0,_1fr)] @3xl:gap-y-8">
              <div className="flex items-center">Link</div>
              <div className="flex items-center justify-start gap-4">
                <Link
                  href={landingPage.url}
                  target="_blank"
                  className="truncate"
                >
                  {landingPage.url}
                </Link>

                <CopyToClipboard data={landingPage.url} />
              </div>

              <div className="flex items-center">Requester</div>
              <div className="flex items-center justify-start gap-4">
                {landingPage.requester ? (
                  <Link
                    href={`/profile/${landingPage.requester.id}`}
                    className={
                      "flex h-auto w-fit flex-row items-center justify-start gap-2"
                    }
                  >
                    <CustomAvatar image={landingPage.requester.image} />
                    {landingPage.requester.name}
                  </Link>
                ) : (
                  <div className="[&_svg]:size-10">
                    <IconClose />
                  </div>
                )}
              </div>

              <div className="flex items-center">Language</div>
              <div className="flex items-center justify-start gap-4">
                {landingPage.language ? (
                  <Link
                    href={`/languages/${landingPage.language.slug}`}
                    className={
                      "flex h-auto w-fit flex-row items-center justify-start gap-2"
                    }
                  >
                    <CustomAvatar image={landingPage.language.flag} />
                    {landingPage.language.englishName}
                  </Link>
                ) : (
                  <div className="[&_svg]:size-10">
                    <IconClose />
                  </div>
                )}
              </div>

              <div className="flex items-center">Brand</div>
              <div className="flex items-center justify-start gap-4">
                {landingPage.brand ? (
                  <Link
                    className="flex h-auto items-center justify-start gap-2 p-0 hover:cursor-pointer"
                    href={`/brands/${landingPage.brand.slug}`}
                  >
                    {landingPage.brand?.logo ? (
                      <SvgMask imageUrl={landingPage.brand.logo} size="md" />
                    ) : (
                      landingPage.brand?.name
                    )}
                  </Link>
                ) : (
                  <div className="[&_svg]:size-10">
                    <IconClose />
                  </div>
                )}
              </div>

              <div className="flex items-center">Topic</div>
              <div className="flex items-center justify-start gap-4">
                {landingPage.topic ? (
                  <Link href={`/topics/${landingPage.topic.slug}`}>
                    {landingPage.topic.name}
                  </Link>
                ) : (
                  <div className="[&_svg]:size-10">
                    <IconClose />
                  </div>
                )}
              </div>

              <div className="flex items-center">License</div>
              <div className="flex items-center justify-start gap-4">
                {landingPage.license ? (
                  <Link href={`/licenses/${landingPage.license.slug}`}>
                    {landingPage.license.name}
                  </Link>
                ) : (
                  <div className="[&_svg]:size-10">
                    <IconClose />
                  </div>
                )}
              </div>

              <div className="flex items-center">Landing page type</div>
              <div className="flex items-center justify-start gap-4">
                {landingPage.landingPageType ? (
                  <Link
                    href={`/landing-page-types/${landingPage.landingPageType.slug}`}
                  >
                    {landingPage.landingPageType.name}
                  </Link>
                ) : (
                  <div className="[&_svg]:size-10">
                    <IconClose />
                  </div>
                )}
              </div>

              <div className="flex items-center">Registration Type</div>
              <div className="flex items-center justify-start gap-4">
                {landingPage.registrationType ? (
                  <Link
                    href={`${registrationTypesMeta.href}/${landingPage.registrationType.slug}`}
                  >
                    {landingPage.registrationType.name}
                  </Link>
                ) : (
                  <div className="[&_svg]:size-10">
                    <IconClose />
                  </div>
                )}
              </div>

              <div className="flex items-center">Created by</div>
              <div className="flex items-center justify-start gap-4">
                {landingPage.createdBy ? (
                  <Link
                    href={`/profile/${landingPage.createdBy.id}`}
                    className={
                      "flex h-auto w-fit flex-row items-center justify-start gap-2"
                    }
                  >
                    <CustomAvatar image={landingPage.createdBy.image} />
                    {landingPage.createdBy.name}
                  </Link>
                ) : (
                  <div className="[&_svg]:size-10">
                    <IconClose />
                  </div>
                )}
              </div>

              <div className="flex items-center">Created at</div>
              <div className="flex items-center justify-start gap-4">
                {landingPage.createdAt ? (
                  dateFormatter({ date: landingPage.createdAt })
                ) : (
                  <div className="[&_svg]:size-10">
                    <IconClose />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageStructure>
  );
};

export default LandingPageTypePage;
