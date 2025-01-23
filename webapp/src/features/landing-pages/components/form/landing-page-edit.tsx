"use client";

import { revalidate } from "@/actions/reavalidate";
import { CustomAvatar } from "@/components/custom-avatar";
import { CustomButton } from "@/components/custom-button";
import { DeleteDialog } from "@/components/delete-dialog";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
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
import { Switch } from "@/components/ui/switch";
import { ACTION_MESSAGES } from "@/constants/messages";
import { FormError } from "@/features/auth/components/form-error";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Prisma, User } from "@prisma/client";
import { Check, ChevronsUpDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "sonner";
import { z } from "zod";
import { deleteLandingPage } from "../../actions/delete-landing-page";
import { editLandingPage } from "../../actions/edit-landing-page";
import { LandingPageSchema } from "../../schemas/landing-page-schema";

interface Props {
  landingPage: Prisma.dl_landing_pageGetPayload<{
    include: {
      createdBy: {
        omit: {
          password: true;
        };
      };
      updatedBy: {
        omit: {
          password: true;
        };
      };
      brand: true;
      design: true;
      formValidation: true;
      language: true;
      license: true;
      landingPageType: true;
      requester: {
        omit: {
          password: true;
        };
      };
      topic: true;
    };
  }>;
  users: Omit<User, "password">[];
  designs: Prisma.dl_designGetPayload<{
    include: {
      createdBy: true;
      updatedBy: true;
    };
  }>[];
  formValidations: Prisma.dl_form_validationGetPayload<{
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
}

export const LandingPageEditForm = ({
  landingPage,
  users,
  designs,
  formValidations,
  licenses,
  landingPageTypes,
  languages,
  brands,
  topics,
}: Props) => {
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [requesterAvatar, setRequesterAvatar] = useState<string | null>(null);
  const [designAvatar, setDesignAvatar] = useState<string | null>(null);
  const [language, setLanguage] = useState<string | null>(null);
  const [brand, setBrand] = useState<string | null>(null);

  const form = useForm<z.infer<typeof LandingPageSchema>>({
    resolver: zodResolver(LandingPageSchema),
    defaultValues: {
      name: landingPage.name,
      slug: landingPage.slug,
      brand: landingPage.brandId || undefined,
      design: landingPage.designId || undefined,
      formValidation: landingPage.formValidationId || undefined,
      isARTS: landingPage.isARTS,
      isReadyForTrafic: landingPage.isReadyForTrafic,
      landingPageType: landingPage.landingPageTypeId || undefined,
      language: landingPage.languageId || undefined,
      license: landingPage.licenseId || undefined,
      requester: landingPage.requesterId || undefined,
      url: landingPage.url,
      whatsapp: landingPage.whatsapp,
      topic: landingPage.topicId || undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof LandingPageSchema>) => {
    setError(undefined);

    startTransition(() => {
      editLandingPage(values, landingPage.id)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            toast.success(data.success);
            router.push(`/landing-pages/${data.lpSlug}`);
          }
          revalidate();
        })
        .catch(() => setError(ACTION_MESSAGES().WENT_WRONG));
    });
  };

  const onDelete = () => {
    startTransition(() => {
      deleteLandingPage(landingPage.id)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            toast.success(data.success);
            router.push(`/landing-pages`);
          }
          revalidate();
        })
        .catch(() => setError(ACTION_MESSAGES().WENT_WRONG));
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 @container"
      >
        <div className="grid grid-cols-1 gap-4 @lg:grid-cols-2 @4xl:grid-cols-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="@4xl:col-span-3">
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
                    placeholder="Landing Page"
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
              <FormItem className="@4xl:col-span-3">
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="landing-page"
                    type="text"
                    disabled
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
            name="whatsapp"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-md border p-3 shadow-sm @lg:col-span-2">
                <FormLabel className="truncate">Whatsapp</FormLabel>
                <FormControl>
                  <Switch
                    disabled={isPending}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isReadyForTrafic"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-md border p-3 shadow-sm @lg:col-span-2">
                <FormLabel className="truncate">
                  Is ready for traffic?
                </FormLabel>
                <FormControl>
                  <Switch
                    disabled={isPending}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isARTS"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-md border p-3 shadow-sm @lg:col-span-2">
                <FormLabel className="truncate">Is ARTS?</FormLabel>
                <FormControl>
                  <Switch
                    disabled={isPending}
                    checked={field.value}
                    onCheckedChange={field.onChange}
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
              <FormItem className="flex flex-col @4xl:col-span-2">
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
                    />
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="design"
            render={({ field }) => (
              <FormItem className="flex flex-col @4xl:col-span-2">
                <FormLabel className="self-start">Design</FormLabel>
                <div className="flex flex-row">
                  <CustomAvatar image={designAvatar} className="me-1 sm:me-2" />

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
                        >
                          <span className="truncate">
                            {field.value
                              ? designs?.find(
                                  (design) =>
                                    design.id.toLowerCase() ===
                                    field.value?.toLowerCase(),
                                )?.name
                              : "Select design"}
                          </span>
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0">
                      <Command>
                        <CommandInput placeholder="Search design..." />
                        <CommandList>
                          <CommandEmpty>No design found.</CommandEmpty>
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
                                    setDesignAvatar(design.avatar);
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
                                      image={design.avatar}
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
                      buttonLabel="Remove design avatar"
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
                        setDesignAvatar(null);
                      }}
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
              <FormItem className="flex flex-col @4xl:col-span-2">
                <FormLabel className="self-start">Language</FormLabel>
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
                        >
                          <span className="truncate">
                            {field.value
                              ? languages?.find(
                                  (language) => language.id === field.value,
                                )?.englishName
                              : "Select language"}
                          </span>
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0">
                      <Command>
                        <CommandInput placeholder="Search language..." />
                        <CommandList>
                          <CommandEmpty>No language found.</CommandEmpty>
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
                      buttonLabel="Remove language"
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
              <FormItem className="flex flex-col @4xl:col-span-3">
                <FormLabel className="self-start">Brand</FormLabel>
                <div className="flex flex-row">
                  <CustomAvatar image={brand} className="me-1 sm:me-2" />
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
                        >
                          <span className="truncate">
                            {field.value
                              ? brands?.find(
                                  (brand) => brand.id === field.value,
                                )?.name
                              : "Select brand"}
                          </span>
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search brand..." />
                        <CommandList>
                          <CommandEmpty>No brand found.</CommandEmpty>
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
                                    <CustomAvatar
                                      image={brand.logo}
                                      className="h-10 w-20 rounded-md"
                                    />
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
                      }}
                    />
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="formValidation"
            render={({ field }) => (
              <FormItem className="flex flex-col @4xl:col-span-3">
                <FormLabel className="self-start">Form Validation</FormLabel>
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
                            form.getValues("formValidation") &&
                              "rounded-e-none",
                          )}
                        >
                          <span className="truncate">
                            {field.value
                              ? formValidations?.find(
                                  (formValidation) =>
                                    formValidation.id === field.value,
                                )?.name
                              : "Select form validation"}
                          </span>
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0">
                      <Command>
                        <CommandInput placeholder="Search form validation..." />
                        <CommandList>
                          <CommandEmpty>No form validation found.</CommandEmpty>
                          <CommandGroup>
                            {formValidations
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
                              .map((formValidation) => (
                                <CommandItem
                                  value={formValidation.name}
                                  key={formValidation.id}
                                  onSelect={() => {
                                    form.setValue(
                                      "formValidation",
                                      formValidation.id,
                                    );
                                  }}
                                  className="flex items-center gap-0"
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      formValidation.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                  <div className="flex items-center gap-4">
                                    {formValidation.name}
                                  </div>
                                </CommandItem>
                              ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  {form.getValues("formValidation") && (
                    <CustomButton
                      buttonLabel="Remove license"
                      icon={MdDeleteOutline}
                      iconPlacement="left"
                      size={"icon"}
                      className={cn(
                        "flex items-center justify-center",
                        form.getValues("formValidation") && "rounded-s-none",
                      )}
                      variant={"danger"}
                      onClick={() => form.setValue("formValidation", "")}
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
              <FormItem className="flex flex-col @4xl:col-span-2">
                <FormLabel className="self-start">License</FormLabel>
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
                        >
                          <span className="truncate">
                            {field.value
                              ? licenses?.find(
                                  (license) => license.id === field.value,
                                )?.name
                              : "Select license"}
                          </span>
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0">
                      <Command>
                        <CommandInput placeholder="Search licenses..." />
                        <CommandList>
                          <CommandEmpty>No licenses found.</CommandEmpty>
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
                      buttonLabel="Remove license"
                      icon={MdDeleteOutline}
                      iconPlacement="left"
                      size={"icon"}
                      className={cn(
                        "flex items-center justify-center",
                        form.getValues("license") && "rounded-s-none",
                      )}
                      variant={"danger"}
                      onClick={() => form.setValue("license", "")}
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
              <FormItem className="flex flex-col @4xl:col-span-2">
                <FormLabel className="self-start">Landing Page Type</FormLabel>
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
                        >
                          <span className="truncate">
                            {field.value
                              ? landingPageTypes?.find(
                                  (landingPageType) =>
                                    landingPageType.id === field.value,
                                )?.name
                              : "Select license"}
                          </span>
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0">
                      <Command>
                        <CommandInput placeholder="Search landing page types..." />
                        <CommandList>
                          <CommandEmpty>
                            No landing page types found.
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
                      buttonLabel="Remove landing page type"
                      icon={MdDeleteOutline}
                      iconPlacement="left"
                      size={"icon"}
                      className={cn(
                        "flex items-center justify-center",
                        form.getValues("landingPageType") && "rounded-s-none",
                      )}
                      variant={"danger"}
                      onClick={() => form.setValue("landingPageType", "")}
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
              <FormItem className="flex flex-col @4xl:col-span-2">
                <FormLabel className="">Topic</FormLabel>
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
                        >
                          <span className="truncate">
                            {field.value
                              ? topics?.find((user) => user.id === field.value)
                                  ?.name
                              : "Select topic"}
                          </span>
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0">
                      <Command>
                        <CommandInput placeholder="Search topic..." />
                        <CommandList>
                          <CommandEmpty>No topic found.</CommandEmpty>
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
                      buttonLabel="Remove topic"
                      icon={MdDeleteOutline}
                      iconPlacement="left"
                      size={"icon"}
                      className={cn(
                        "flex items-center justify-center",
                        form.getValues("topic") && "rounded-s-none",
                      )}
                      variant={"danger"}
                      onClick={() => form.setValue("topic", "")}
                    />
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormError message={error} />

        <div className="flex gap-4">
          <CustomButton
            buttonLabel="Update Landing Page"
            type="submit"
            disabled={isPending}
          />
          <DeleteDialog
            label={landingPage.name}
            asset={"Landing Page"}
            onDelete={onDelete}
            hideLabelOnMobile={false}
            disabled={isPending}
          />
        </div>
      </form>
    </Form>
  );
};
