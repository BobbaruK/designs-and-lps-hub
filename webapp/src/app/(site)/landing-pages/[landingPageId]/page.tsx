import { CopyToClipboard } from "@/components/copy-to-clipboard";
import { CustomAvatar } from "@/components/custom-avatar";
import { UserAvatar } from "@/components/data-table/user-avatar";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getLandingPageBySlug } from "@/features/landing-pages/data/get-landing-page";
import { IBreadcrumb } from "@/types/breadcrumb";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaTrafficLight, FaWhatsapp } from "react-icons/fa";
import { TbBrandAstro, TbSquareRoundedLetterX } from "react-icons/tb";

const BREADCRUMBS = ({ href, label }: IBreadcrumb): IBreadcrumb[] => {
  return [
    {
      href: "/dashboard",
      label: "Home",
    },
    {
      href: "/landing-pages",
      label: "Landing Pages",
    },
    {
      href,
      label,
    },
  ];
};

interface Props {
  params: Promise<{
    landingPageId: string;
  }>;
}

const LandingPageTypePage = async ({ params }: Props) => {
  const { landingPageId } = await params;

  const landingPage = await getLandingPageBySlug(landingPageId);

  if (!landingPage) notFound();

  return (
    <PageStructure>
      <PageBreadcrumbs
        crumbs={BREADCRUMBS({
          href: `/landing-pages/${landingPage.slug}`,
          label: landingPage.name,
        })}
      />
      <PageTtle
        label={landingPage?.name}
        backBtnHref="/landing-pages"
        editBtnHref={`/landing-pages/${landingPage.slug}/edit`}
      />

      <div className="@container">
        <div className="flex flex-col gap-4 @3xl:flex-row @3xl:gap-8">
          <div className="flex w-full flex-col items-center gap-4 @3xl:w-3/12">
            {landingPage.design?.avatar ? (
              <Link
                href={`/designs/${landingPage.design.slug}`}
                className="w-full"
              >
                <CustomAvatar
                  image={landingPage.design.avatar}
                  className="h-56 w-full rounded-md @3xl:h-44"
                />
              </Link>
            ) : (
              <CustomAvatar
                image={landingPage.design?.avatar}
                className="h-36 w-full rounded-md @3xl:h-36"
              />
            )}
            <div className="flex w-full flex-row flex-wrap justify-around gap-4">
              <Badge
                variant={landingPage.whatsapp ? "success" : "danger"}
                className="grid size-8 place-items-center rounded-full p-0"
              >
                <FaWhatsapp className="size-5" />
              </Badge>
              <Badge
                variant={landingPage.isReadyForTrafic ? "success" : "danger"}
                className="grid size-8 place-items-center rounded-full p-0"
              >
                <FaTrafficLight className="size-5" />
              </Badge>
              <Badge
                variant={landingPage.isARTS ? "success" : "danger"}
                className="grid size-8 place-items-center rounded-full p-0"
              >
                <TbBrandAstro className="size-5" />
              </Badge>
            </div>
          </div>

          <div className="flex flex-col gap-4 @3xl:w-9/12">
            <div className="grid grid-cols-[100px_minmax(0,_1fr)] gap-x-2 gap-y-4 @md:grid-cols-[150px_minmax(0,_1fr)] @3xl:gap-y-8">
              <div className="flex items-center">Link</div>
              <div className="flex items-center justify-start gap-4">
                <Button
                  asChild
                  variant={"link"}
                  className="block h-auto max-w-full justify-start truncate p-0 text-foreground"
                >
                  <Link href={landingPage.url} target="_blank">
                    {landingPage.url}
                  </Link>
                </Button>
                <CopyToClipboard data={landingPage.url} />
              </div>

              <div className="flex items-center">Requester</div>
              <div className="flex items-center justify-start gap-4">
                <UserAvatar
                  image={landingPage.requester?.image}
                  name={landingPage.requester?.name}
                  linkHref={`/profile/${landingPage.requester?.id}`}
                />
              </div>

              <div className="flex items-center">Language</div>
              <div className="flex items-center justify-start gap-4">
                <UserAvatar
                  image={landingPage.language?.flag}
                  name={landingPage.language?.englishName}
                  linkHref={`/languages/${landingPage.language?.iso_639_1}`}
                />
              </div>

              <div className="flex items-center">Brand</div>
              <div className="flex items-center justify-start gap-4">
                {/* TODO: after encapsulating NameCell n shit come here and edit this also */}
                {landingPage.brand ? (
                  <Link
                    href={`/brands/${landingPage.brand.slug}`}
                    className="flex items-center gap-2 truncate"
                  >
                    <CustomAvatar
                      image={landingPage.brand?.logo}
                      className="h-[30px] w-[120px] overflow-hidden rounded-md bg-black"
                    />
                    <span className="truncate">{landingPage.brand?.name}</span>
                  </Link>
                ) : (
                  <span className="flex items-center gap-2 truncate">
                    <CustomAvatar className="h-[30px] w-[120px] overflow-hidden rounded-md bg-black" />
                    <span className="truncate">No brand</span>
                  </span>
                )}
              </div>

              <div className="flex items-center">Topic</div>
              <div className="flex items-center justify-start gap-4">
                {landingPage.topic ? (
                  <Button
                    asChild
                    variant={"link"}
                    className="block h-auto max-w-full justify-start truncate p-0 text-foreground"
                  >
                    <Link href={`/topics/${landingPage.topic.slug}`}>
                      {landingPage.topic.name}
                    </Link>
                  </Button>
                ) : (
                  <TbSquareRoundedLetterX className="text-danger" size={40} />
                )}
              </div>

              <div className="flex items-center">License</div>
              <div className="flex items-center justify-start gap-4">
                {landingPage.license ? (
                  <Button
                    asChild
                    variant={"link"}
                    className="block h-auto max-w-full justify-start truncate p-0 text-foreground"
                  >
                    <Link href={`/licenses/${landingPage.license.slug}`}>
                      {landingPage.license.name}
                    </Link>
                  </Button>
                ) : (
                  <TbSquareRoundedLetterX className="text-danger" size={40} />
                )}
              </div>

              <div className="flex items-center">Landing page type</div>
              <div className="flex items-center justify-start gap-4">
                {landingPage.lpType ? (
                  <Button
                    asChild
                    variant={"link"}
                    className="block h-auto max-w-full justify-start truncate p-0 text-foreground"
                  >
                    <Link
                      href={`/landing-page-types/${landingPage.lpType.slug}`}
                    >
                      {landingPage.lpType.name}
                    </Link>
                  </Button>
                ) : (
                  <TbSquareRoundedLetterX className="text-danger" size={40} />
                )}
              </div>

              <div className="flex items-center">Form validation</div>
              <div className="flex items-center justify-start gap-4">
                {landingPage.formValidation ? (
                  <Button
                    asChild
                    variant={"link"}
                    className="block h-auto max-w-full justify-start truncate p-0 text-foreground"
                  >
                    <Link
                      href={`/form-validations/${landingPage.formValidation.slug}`}
                    >
                      {landingPage.formValidation.name}
                    </Link>
                  </Button>
                ) : (
                  <TbSquareRoundedLetterX className="text-danger" size={40} />
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
