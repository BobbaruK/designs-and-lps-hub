"use client";
import { revalidate } from "@/actions/reavalidate";
import { CustomAvatar } from "@/components/custom-avatar";
import { CustomButton } from "@/components/custom-button";
import { IconAstro } from "@/components/icons/astro";
import { IconHome } from "@/components/icons/home";
import { IconPickaxe } from "@/components/icons/pickaxe";
import { IconTraffic } from "@/components/icons/traffic";
import { IconWhatsapp } from "@/components/icons/whatsapp";
import { SvgMask } from "@/components/svg-mask";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import MultipleSelector, {
  Option,
} from "@/components/ui/expansions/multiple-selector";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ACTION_MESSAGES } from "@/constants/messages";
import { brandsMeta } from "@/constants/page-titles/brands";
import { designsMeta } from "@/constants/page-titles/designs";
import { featuresTypeMeta } from "@/constants/page-titles/features";
import { landingPageTypeMeta } from "@/constants/page-titles/landing-page-type";
import { landingPagesMeta } from "@/constants/page-titles/landing-pages";
import { languagesMeta } from "@/constants/page-titles/languages";
import { licensesMeta } from "@/constants/page-titles/licenses";
import { registrationTypesMeta } from "@/constants/page-titles/registration-types";
import { topicsMeta } from "@/constants/page-titles/topics";
import { FormError } from "@/features/auth/components/form-error";
import { useSearchParams } from "@/hooks/use-search-params";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { dl_avatar_design, Prisma, User } from "@prisma/client";
import { Check, ChevronsUpDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "sonner";
import { z } from "zod";
import { addLandingPage } from "../../actions/add-landing-page";
import { LandingPageSchema } from "../../schemas/landing-page-schema";

interface Props {
  users: Omit<User, "password">[];
  designs: Prisma.dl_designGetPayload<{
    include: {
      createdBy: true;
      updatedBy: true;
      avatars: true;
      // _count: {
      //   select: {
      //     landingPages: true;
      //   };
      // };
    };
  }>[];
  avatars: dl_avatar_design[];
  registrationTypes: Prisma.dl_registration_typeGetPayload<{
    include: {
      createdBy: true;
      updatedBy: true;
    };
  }>[];
  licenses: Prisma.dl_licenseGetPayload<{
    include: {
      createdBy: true;
      updatedBy: true;
    };
  }>[];
  landingPageTypes: Prisma.dl_landing_page_typeGetPayload<{
    include: {
      createdBy: true;
      updatedBy: true;
    };
  }>[];
  languages: Prisma.dl_languageGetPayload<{
    include: {
      createdBy: true;
      updatedBy: true;
    };
  }>[];
  brands: Prisma.dl_brandGetPayload<{
    include: {
      createdBy: true;
      updatedBy: true;
    };
  }>[];
  topics: Prisma.dl_topicGetPayload<{
    include: {
      createdBy: true;
      updatedBy: true;
    };
  }>[];
  features: Option[];
  brandHasHome: boolean;
}

export const LandingPageAddForm = ({
  users,
  designs,
  avatars,
  registrationTypes,
  licenses,
  landingPageTypes,
  languages,
  brands,
  topics,
  features,
  brandHasHome,
}: Props) => {
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [requesterAvatar, setRequesterAvatar] = useState<string | null>(null);
  const [lpAvatar, setLpAvatar] = useState<string | null>(null);
  const [language, setLanguage] = useState<string | null>(null);
  const [brand, setBrand] = useState<string | null>(null);
  const [
    { brand: searchParamsBrands, design: searchParamsDesign },
    setSearchParams,
  ] = useSearchParams(startTransition);

  const form = useForm<z.infer<typeof LandingPageSchema>>({
    resolver: zodResolver(LandingPageSchema),
    defaultValues: {
      name: "",
      slug: "",
      brand: searchParamsBrands ? searchParamsBrands[0] : "",
      design: searchParamsDesign ? searchParamsDesign[0] : "",
      avatar: "",
      features: [],
      registrationType: "",
      isARTS: false,
      isReadyForTraffic: false,
      isUnderMaintenance: false,
      landingPageType: "",
      language: "",
      license: "",
      requester: "",
      url: "",
      whatsapp: false,
      topic: "",
      isHome: brandHasHome && false,
    },
  });

  const onSubmit = async (values: z.infer<typeof LandingPageSchema>) => {
    setError(undefined);

    startTransition(() => {
      addLandingPage(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            toast.success(data.success);
            router.push(landingPagesMeta.href);
          }
          revalidate();
        })
        .catch(() => setError(ACTION_MESSAGES().WENT_WRONG));
    });
  };

  const checkBrand = form.watch("brand");

  useEffect(() => {
    form.setValue("isHome", brandHasHome && false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkBrand]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-10 @container"
      >
        <div className="grid grid-cols-1 gap-4 gap-y-6 @lg:grid-cols-2 @4xl:grid-cols-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="@4xl:col-span-2">
                <FormLabel>Name</FormLabel>
                <FormControl
                  onKeyUp={() => {
                    form.setValue(
                      "slug",
                      field.value.toLowerCase().replaceAll(/[^A-Z0-9]/gi, "-"),
                    );
                  }}
                >
                  <Input
                    {...field}
                    placeholder={landingPagesMeta.label.singular}
                    disabled={isPending}
                  />
                </FormControl>
                <FormDescription>
                  Name generator{" "}
                  <Link
                    href={
                      "https://www.fantasynamegenerators.com/gnome-town-names.php"
                    }
                    target="_blank"
                    className="underline"
                  >
                    here
                  </Link>
                  .
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem className="@4xl:col-span-2">
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={landingPagesMeta.label.singular
                      .toLowerCase()
                      .replaceAll(" ", "-")}
                    type="text"
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-4">
          <FormField
            control={form.control}
            name="isARTS"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <button
                    className="grid w-full place-items-center gap-4 rounded-md border p-4 py-8 shadow-sm [&_svg]:size-12"
                    onClick={() => {
                      field.onChange(!field.value);
                    }}
                    type="button"
                  >
                    <span className="sr-only text-sm">Is ARTS?</span>
                    <IconAstro isSuccess={field.value} />
                  </button>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isHome"
            render={({ field }) => (
              <FormItem className="">
                <FormControl>
                  <button
                    className="grid w-full place-items-center gap-4 rounded-md border p-4 py-8 shadow-sm disabled:opacity-50 [&_svg]:size-12"
                    onClick={() => {
                      field.onChange(!field.value);
                    }}
                    type="button"
                    disabled={isPending || brandHasHome || !searchParamsBrands}
                  >
                    <span className="sr-only text-sm">Is home?</span>
                    <IconHome isSuccess={field.value} />
                  </button>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="whatsapp"
            render={({ field }) => (
              <FormItem className="">
                <FormControl>
                  <button
                    className="grid w-full place-items-center gap-4 rounded-md border p-4 py-8 shadow-sm [&_svg]:size-12"
                    onClick={() => {
                      field.onChange(!field.value);
                    }}
                    type="button"
                  >
                    <span className="sr-only text-sm">
                      Has whatsapp functionality?
                    </span>
                    <IconWhatsapp isSuccess={field.value} />
                  </button>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isReadyForTraffic"
            render={({ field }) => (
              <FormItem className="">
                <FormControl>
                  <button
                    className="grid w-full place-items-center gap-4 rounded-md border p-4 py-8 shadow-sm [&_svg]:size-12"
                    onClick={() => {
                      field.onChange(!field.value);
                    }}
                    type="button"
                  >
                    <span className="sr-only text-sm">
                      Is ready for traffic?
                    </span>
                    <IconTraffic isSuccess={field.value} />
                  </button>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isUnderMaintenance"
            render={({ field }) => (
              <FormItem className="">
                <FormControl>
                  <button
                    className="grid w-full place-items-center gap-4 rounded-md border p-4 py-8 shadow-sm [&_svg]:size-12"
                    onClick={() => {
                      field.onChange(!field.value);
                    }}
                    type="button"
                  >
                    <span className="sr-only text-sm">
                      Is under maintenance?
                    </span>
                    <IconPickaxe isSuccess={field.value} />
                  </button>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 gap-y-6 @lg:grid-cols-2 @4xl:grid-cols-4">
          <FormField
            control={form.control}
            name="design"
            render={({ field }) => (
              <FormItem className="flex flex-col @4xl:col-span-2">
                <FormLabel className="self-start">
                  {designsMeta.label.singular}
                </FormLabel>
                <div className="flex flex-row items-center">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl className="w-full">
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "justify-between truncate",
                            !field.value && "text-muted-foreground",
                            form.getValues("design") && "rounded-e-none",
                          )}
                          disabled={isPending}
                        >
                          <span className="truncate">
                            {field.value
                              ? designs?.find(
                                  (design) =>
                                    design.id.toLowerCase() ===
                                    field.value?.toLowerCase(),
                                )?.name
                              : `Select ${designsMeta.label.singular.toLowerCase()}`}
                          </span>
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0">
                      <Command>
                        <CommandInput
                          placeholder={`Search ${designsMeta.label.singular.toLowerCase()}...`}
                        />
                        <CommandList>
                          <CommandEmpty>
                            No {designsMeta.label.singular.toLowerCase()} found.
                          </CommandEmpty>
                          <CommandGroup>
                            {designs
                              ?.sort((a, b) => {
                                const nameA = a.name.toLowerCase();
                                const nameB = b.name.toLowerCase();
                                if (nameA < nameB) {
                                  return -1;
                                }
                                if (nameA > nameB) {
                                  return 1;
                                }

                                return 0;
                              })
                              .map((design) => (
                                <CommandItem
                                  value={design.name}
                                  key={design.id}
                                  onSelect={() => {
                                    form.setValue("design", design.id);

                                    setSearchParams({
                                      design: [design.id],
                                    });

                                    setLpAvatar(null);
                                    form.setValue("avatar", "");
                                  }}
                                  className="flex items-center gap-0"
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      design.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                  <div className="flex items-center gap-4">
                                    <CustomAvatar
                                      image={
                                        design.avatars[0] &&
                                        design.avatars[0].url
                                      }
                                      className="size-20 rounded-md"
                                    />
                                    {design.name}
                                  </div>
                                </CommandItem>
                              ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  {form.getValues("design") && (
                    <CustomButton
                      buttonLabel={`Remove ${designsMeta.label.singular.toLowerCase()}`}
                      icon={MdDeleteOutline}
                      iconPlacement="left"
                      size={"icon"}
                      className={cn(
                        "flex items-center justify-center",
                        form.getValues("design") && "rounded-s-none",
                      )}
                      variant={"danger"}
                      onClick={() => {
                        form.setValue("design", "");
                        form.setValue("avatar", "");
                        setLpAvatar(null);
                        setSearchParams({
                          design: null,
                        });
                      }}
                      disabled={isPending}
                    />
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <FormItem className="flex flex-col @4xl:col-span-2">
                <FormLabel className="self-start">Avatar</FormLabel>
                <div className="flex flex-row items-center">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl className="w-full">
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "justify-between truncate",
                            !field.value && "text-muted-foreground",
                            form.getValues("avatar") && "rounded-e-none",
                          )}
                          disabled={isPending}
                        >
                          <span className="truncate">
                            {field.value
                              ? avatars.find(
                                  (avatar) =>
                                    avatar.id.toLowerCase() ===
                                    field.value?.toLowerCase(),
                                )?.name
                              : `Select avatar`}
                          </span>
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0">
                      <Command>
                        <CommandInput placeholder={`Search avatar...`} />
                        <CommandList>
                          <CommandEmpty>No avatar found.</CommandEmpty>
                          <CommandGroup>
                            {avatars
                              ?.sort((a, b) => {
                                const nameA = a.name.toLowerCase();
                                const nameB = b.name.toLowerCase();
                                if (nameA < nameB) {
                                  return -1;
                                }
                                if (nameA > nameB) {
                                  return 1;
                                }

                                return 0;
                              })
                              .map((avatar) => (
                                <CommandItem
                                  value={avatar.name}
                                  key={avatar.id}
                                  onSelect={() => {
                                    form.setValue("avatar", avatar.id);
                                    setLpAvatar(avatar.url);
                                  }}
                                  className="flex items-center gap-0"
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      avatar.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                  <div className="flex items-center gap-4">
                                    <CustomAvatar
                                      image={avatar.url}
                                      className="size-20 rounded-md"
                                    />
                                    {avatar.name}
                                  </div>
                                </CommandItem>
                              ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  {form.getValues("avatar") && (
                    <CustomButton
                      buttonLabel={`Remove avatar`}
                      icon={MdDeleteOutline}
                      iconPlacement="left"
                      size={"icon"}
                      className={cn(
                        "flex items-center justify-center",
                        form.getValues("avatar") && "rounded-s-none",
                      )}
                      variant={"danger"}
                      onClick={() => {
                        form.setValue("avatar", "");
                        setLpAvatar(null);
                      }}
                      disabled={isPending}
                    />
                  )}
                </div>
                {lpAvatar ? (
                  <Link href={lpAvatar} target="_blank" className="block w-fit">
                    <CustomAvatar
                      image={lpAvatar}
                      className="me-1 h-[140px] w-[280px] rounded-sm sm:me-2"
                      position="top"
                    />
                  </Link>
                ) : (
                  <CustomAvatar
                    image={null}
                    className="me-1 h-[140px] w-[280px] rounded-sm sm:me-2"
                    position="top"
                  />
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 gap-y-6 @lg:grid-cols-2 @4xl:grid-cols-4">
          <FormField
            control={form.control}
            name="features"
            render={({ field }) => (
              <FormItem className="@lg:col-span-full">
                <FormLabel>{featuresTypeMeta.label.plural}</FormLabel>
                <FormControl>
                  <MultipleSelector
                    {...field}
                    defaultOptions={features}
                    hidePlaceholderWhenSelected
                    placeholder={`Select ${featuresTypeMeta.label.plural.toLowerCase()}...`}
                    emptyIndicator={
                      <p className="text-center text-gray-600 dark:text-gray-400">
                        no {featuresTypeMeta.label.plural.toLowerCase()} found.
                      </p>
                    }
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="@lg:col-span-full">
                <FormLabel>URL</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="https://something.com/lp/name-of-lp"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="requester"
            render={({ field }) => (
              <FormItem className="flex flex-col @4xl:col-span-1">
                <FormLabel className="self-start">Requester</FormLabel>
                <div className="flex flex-row">
                  <CustomAvatar
                    image={requesterAvatar}
                    className="me-1 sm:me-2"
                  />
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl className="w-full">
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between truncate",
                            !field.value && "text-muted-foreground",
                            form.getValues("requester") && "rounded-e-none",
                          )}
                          disabled={isPending}
                        >
                          <span className="truncate">
                            {field.value
                              ? users?.find((user) => user.id === field.value)
                                  ?.name
                              : "Select user"}
                          </span>
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0">
                      <Command>
                        <CommandInput placeholder="Search user..." />
                        <CommandList>
                          <CommandEmpty>No user found.</CommandEmpty>
                          <CommandGroup>
                            {users
                              ?.sort((a, b) => {
                                const nameA = a.name.toLowerCase();
                                const nameB = b.name.toLowerCase();
                                if (nameA < nameB) {
                                  return -1;
                                }
                                if (nameA > nameB) {
                                  return 1;
                                }

                                return 0;
                              })
                              .map((user) => (
                                <CommandItem
                                  value={user.name}
                                  key={user.id}
                                  onSelect={() => {
                                    form.setValue("requester", user.id);
                                    setRequesterAvatar(user.image);
                                  }}
                                  className="flex items-center gap-0"
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      user.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                  <div className="flex items-center gap-4">
                                    <CustomAvatar
                                      image={user.image}
                                      className="size-7"
                                    />
                                    {user.name}
                                  </div>
                                </CommandItem>
                              ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  {form.getValues("requester") && (
                    <CustomButton
                      buttonLabel="Remove user"
                      icon={MdDeleteOutline}
                      iconPlacement="left"
                      size={"icon"}
                      className={cn(
                        "flex items-center justify-center",
                        form.getValues("requester") && "rounded-s-none",
                      )}
                      variant={"danger"}
                      type="button"
                      onClick={() => {
                        form.setValue("requester", "");
                        setRequesterAvatar(null);
                      }}
                      disabled={isPending}
                    />
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem className="flex flex-col @4xl:col-span-1">
                <FormLabel className="self-start">
                  {languagesMeta.label.singular}
                </FormLabel>
                <div className="flex flex-row">
                  <CustomAvatar image={language} className="me-1 sm:me-2" />
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl className="w-full">
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "justify-between truncate",
                            !field.value && "text-muted-foreground",
                            form.getValues("language") && "rounded-e-none",
                          )}
                          disabled={isPending}
                        >
                          <span className="truncate">
                            {field.value
                              ? languages?.find(
                                  (language) => language.id === field.value,
                                )?.englishName
                              : `Select ${languagesMeta.label.singular.toLowerCase()}`}
                          </span>
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0">
                      <Command>
                        <CommandInput
                          placeholder={`Search ${languagesMeta.label.singular.toLowerCase()}...`}
                        />
                        <CommandList>
                          <CommandEmpty>
                            No {languagesMeta.label.singular.toLowerCase()}{" "}
                            found.
                          </CommandEmpty>
                          <CommandGroup>
                            {languages
                              ?.sort((a, b) => {
                                const nameA = a.englishName.toLowerCase();
                                const nameB = b.englishName.toLowerCase();
                                if (nameA < nameB) {
                                  return -1;
                                }
                                if (nameA > nameB) {
                                  return 1;
                                }

                                return 0;
                              })
                              .map((language) => (
                                <CommandItem
                                  value={language.name}
                                  key={language.id}
                                  onSelect={() => {
                                    form.setValue("language", language.id);
                                    setLanguage(language.flag);
                                  }}
                                  className="flex items-center gap-0"
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      language.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                  <div className="flex items-center gap-4">
                                    <CustomAvatar
                                      image={language.flag}
                                      className="size-7"
                                    />
                                    {language.englishName}
                                  </div>
                                </CommandItem>
                              ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  {form.getValues("language") && (
                    <CustomButton
                      buttonLabel={`Remove ${languagesMeta.label.singular}`}
                      icon={MdDeleteOutline}
                      iconPlacement="left"
                      size={"icon"}
                      className={cn(
                        "flex items-center justify-center",
                        form.getValues("language") && "rounded-s-none",
                      )}
                      variant={"danger"}
                      onClick={() => {
                        form.setValue("language", "");
                        setLanguage(null);
                      }}
                      disabled={isPending}
                    />
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem className="flex flex-col @4xl:col-span-2">
                <FormLabel className="self-start">
                  {brandsMeta.label.singular}
                </FormLabel>
                <div className="flex flex-row">
                  <SvgMask imageUrl={brand} className="me-1 sm:me-2" />
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl className="w-full">
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "justify-between truncate",
                            !field.value && "text-muted-foreground",
                            form.getValues("brand") && "rounded-e-none",
                          )}
                          disabled={isPending}
                        >
                          <span className="truncate">
                            {field.value
                              ? brands?.find(
                                  (brand) => brand.id === field.value,
                                )?.name
                              : `Select ${brandsMeta.label.singular.toLowerCase()}`}
                          </span>
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput
                          placeholder={`Search ${brandsMeta.label.singular.toLowerCase()}...`}
                        />
                        <CommandList>
                          <CommandEmpty>
                            No {brandsMeta.label.singular.toLowerCase()} found.
                          </CommandEmpty>
                          <CommandGroup>
                            {brands
                              ?.sort((a, b) => {
                                const nameA = a.name.toLowerCase();
                                const nameB = b.name.toLowerCase();
                                if (nameA < nameB) {
                                  return -1;
                                }
                                if (nameA > nameB) {
                                  return 1;
                                }

                                return 0;
                              })
                              .map((brand) => (
                                <CommandItem
                                  value={brand.name}
                                  key={brand.id}
                                  onSelect={() => {
                                    form.setValue("brand", brand.id);
                                    setBrand(brand.logo);

                                    setSearchParams({
                                      brand: [brand.id],
                                    });
                                  }}
                                  className="flex items-center gap-0"
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      brand.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                  <div className="flex items-center gap-4">
                                    <SvgMask imageUrl={brand.logo} />
                                    {brand.name}
                                  </div>
                                </CommandItem>
                              ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  {form.getValues("brand") && (
                    <CustomButton
                      buttonLabel="Remove brand"
                      icon={MdDeleteOutline}
                      iconPlacement="left"
                      size={"icon"}
                      className={cn(
                        "flex items-center justify-center",
                        form.getValues("brand") && "rounded-s-none",
                      )}
                      variant={"danger"}
                      onClick={() => {
                        form.setValue("brand", "");
                        setBrand(null);
                        setSearchParams({
                          brand: null,
                        });
                      }}
                      disabled={isPending}
                    />
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="registrationType"
            render={({ field }) => (
              <FormItem className="flex flex-col @4xl:col-span-1">
                <FormLabel className="self-start">
                  {registrationTypesMeta.label.singular}
                </FormLabel>
                <div className="flex flex-row items-center">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl className="w-full">
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "justify-between truncate",
                            !field.value && "text-muted-foreground",
                            form.getValues("registrationType") &&
                              "rounded-e-none",
                          )}
                          disabled={isPending}
                        >
                          <span className="truncate">
                            {field.value
                              ? registrationTypes?.find(
                                  (registrationType) =>
                                    registrationType.id === field.value,
                                )?.name
                              : `Select ${registrationTypesMeta.label.singular.toLowerCase()}`}
                          </span>
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0">
                      <Command>
                        <CommandInput
                          placeholder={`Search ${registrationTypesMeta.label.singular.toLowerCase()}...`}
                        />
                        <CommandList>
                          <CommandEmpty>
                            No{" "}
                            {registrationTypesMeta.label.singular.toLowerCase()}{" "}
                            found.
                          </CommandEmpty>
                          <CommandGroup>
                            {registrationTypes
                              ?.sort((a, b) => {
                                const nameA = a.name.toLowerCase();
                                const nameB = b.name.toLowerCase();
                                if (nameA < nameB) {
                                  return -1;
                                }
                                if (nameA > nameB) {
                                  return 1;
                                }

                                return 0;
                              })
                              .map((registrationType) => (
                                <CommandItem
                                  value={registrationType.name}
                                  key={registrationType.id}
                                  onSelect={() => {
                                    form.setValue(
                                      "registrationType",
                                      registrationType.id,
                                    );
                                  }}
                                  className="flex items-center gap-0"
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      registrationType.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                  <div className="flex items-center gap-4">
                                    {registrationType.name}
                                  </div>
                                </CommandItem>
                              ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  {form.getValues("registrationType") && (
                    <CustomButton
                      buttonLabel={`Remove ${registrationTypesMeta.label.singular.toLowerCase()}`}
                      icon={MdDeleteOutline}
                      iconPlacement="left"
                      size={"icon"}
                      className={cn(
                        "flex items-center justify-center",
                        form.getValues("registrationType") && "rounded-s-none",
                      )}
                      variant={"danger"}
                      onClick={() => form.setValue("registrationType", "")}
                      disabled={isPending}
                    />
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="license"
            render={({ field }) => (
              <FormItem className="flex flex-col @4xl:col-span-1">
                <FormLabel className="self-start">
                  {licensesMeta.label.singular}
                </FormLabel>
                <div className="flex flex-row items-center">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl className="w-full">
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "justify-between truncate",
                            !field.value && "text-muted-foreground",
                            form.getValues("license") && "rounded-e-none",
                          )}
                          disabled={isPending}
                        >
                          <span className="truncate">
                            {field.value
                              ? licenses?.find(
                                  (license) => license.id === field.value,
                                )?.name
                              : `Select ${licensesMeta.label.singular.toLowerCase()}`}
                          </span>
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0">
                      <Command>
                        <CommandInput
                          placeholder={`Search ${licensesMeta.label.singular.toLowerCase()}...`}
                        />
                        <CommandList>
                          <CommandEmpty>
                            No {licensesMeta.label.singular.toLowerCase()}{" "}
                            found.
                          </CommandEmpty>
                          <CommandGroup>
                            {licenses
                              ?.sort((a, b) => {
                                const nameA = a.name.toLowerCase();
                                const nameB = b.name.toLowerCase();
                                if (nameA < nameB) {
                                  return -1;
                                }
                                if (nameA > nameB) {
                                  return 1;
                                }

                                return 0;
                              })
                              .map((license) => (
                                <CommandItem
                                  value={license.name}
                                  key={license.id}
                                  onSelect={() => {
                                    form.setValue("license", license.id);
                                  }}
                                  className="flex items-center gap-0"
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      license.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                  <div className="flex items-center gap-4">
                                    {license.name}
                                  </div>
                                </CommandItem>
                              ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  {form.getValues("license") && (
                    <CustomButton
                      buttonLabel={`Remove ${licensesMeta.label.singular.toLowerCase()}`}
                      icon={MdDeleteOutline}
                      iconPlacement="left"
                      size={"icon"}
                      className={cn(
                        "flex items-center justify-center",
                        form.getValues("license") && "rounded-s-none",
                      )}
                      variant={"danger"}
                      onClick={() => form.setValue("license", "")}
                      disabled={isPending}
                    />
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="landingPageType"
            render={({ field }) => (
              <FormItem className="flex flex-col @4xl:col-span-1">
                <FormLabel className="self-start">
                  {landingPageTypeMeta.label.singular}
                </FormLabel>
                <div className="flex flex-row items-center">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl className="w-full">
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "justify-between truncate",
                            !field.value && "text-muted-foreground",
                            form.getValues("landingPageType") &&
                              "rounded-e-none",
                          )}
                          disabled={isPending}
                        >
                          <span className="truncate">
                            {field.value
                              ? landingPageTypes?.find(
                                  (landingPageType) =>
                                    landingPageType.id === field.value,
                                )?.name
                              : `Select ${landingPageTypeMeta.label.singular.toLowerCase()}`}
                          </span>
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0">
                      <Command>
                        <CommandInput
                          placeholder={`Search ${landingPageTypeMeta.label.singular.toLowerCase()}...`}
                        />
                        <CommandList>
                          <CommandEmpty>
                            No{" "}
                            {landingPageTypeMeta.label.singular.toLowerCase()}{" "}
                            found.
                          </CommandEmpty>
                          <CommandGroup>
                            {landingPageTypes
                              ?.sort((a, b) => {
                                const nameA = a.name.toLowerCase();
                                const nameB = b.name.toLowerCase();
                                if (nameA < nameB) {
                                  return -1;
                                }
                                if (nameA > nameB) {
                                  return 1;
                                }

                                return 0;
                              })
                              .map((landingPageType) => (
                                <CommandItem
                                  value={landingPageType.name}
                                  key={landingPageType.id}
                                  onSelect={() => {
                                    form.setValue(
                                      "landingPageType",
                                      landingPageType.id,
                                    );
                                  }}
                                  className="flex items-center gap-0"
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      landingPageType.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                  <div className="flex items-center gap-4">
                                    {landingPageType.name}
                                  </div>
                                </CommandItem>
                              ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  {form.getValues("landingPageType") && (
                    <CustomButton
                      buttonLabel={`Remove ${landingPageTypeMeta.label.singular}`}
                      icon={MdDeleteOutline}
                      iconPlacement="left"
                      size={"icon"}
                      className={cn(
                        "flex items-center justify-center",
                        form.getValues("landingPageType") && "rounded-s-none",
                      )}
                      variant={"danger"}
                      onClick={() => form.setValue("landingPageType", "")}
                      disabled={isPending}
                    />
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="topic"
            render={({ field }) => (
              <FormItem className="flex flex-col @4xl:col-span-1">
                <FormLabel className="">{topicsMeta.label.singular}</FormLabel>
                <div className="flex flex-row items-center">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl className="w-full">
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "justify-between truncate",
                            !field.value && "text-muted-foreground",
                            form.getValues("topic") && "rounded-e-none",
                          )}
                          disabled={isPending}
                        >
                          <span className="truncate">
                            {field.value
                              ? topics?.find((user) => user.id === field.value)
                                  ?.name
                              : `Select ${topicsMeta.label.singular.toLowerCase()}`}
                          </span>
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0">
                      <Command>
                        <CommandInput
                          placeholder={`Search ${topicsMeta.label.singular.toLowerCase()}...`}
                        />
                        <CommandList>
                          <CommandEmpty>
                            No {topicsMeta.label.singular.toLowerCase()} found.
                          </CommandEmpty>
                          <CommandGroup>
                            {topics
                              ?.sort((a, b) => {
                                const nameA = a.name.toLowerCase();
                                const nameB = b.name.toLowerCase();
                                if (nameA < nameB) {
                                  return -1;
                                }
                                if (nameA > nameB) {
                                  return 1;
                                }

                                return 0;
                              })
                              .map((topic) => (
                                <CommandItem
                                  value={topic.name}
                                  key={topic.id}
                                  onSelect={() => {
                                    form.setValue("topic", topic.id);
                                  }}
                                  className="flex items-center gap-0"
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      topic.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                  <div className="flex items-center gap-4">
                                    {topic.name}
                                  </div>
                                </CommandItem>
                              ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  {form.getValues("topic") && (
                    <CustomButton
                      buttonLabel={`Remove ${topicsMeta.label.singular.toLowerCase()}`}
                      icon={MdDeleteOutline}
                      iconPlacement="left"
                      size={"icon"}
                      className={cn(
                        "flex items-center justify-center",
                        form.getValues("topic") && "rounded-s-none",
                      )}
                      variant={"danger"}
                      onClick={() => form.setValue("topic", "")}
                      disabled={isPending}
                    />
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormError message={error} />
        <CustomButton
          buttonLabel={`Add ${landingPagesMeta.label.singular.toLowerCase()}`}
          type="submit"
          disabled={isPending}
        />
      </form>
    </Form>
  );
};
