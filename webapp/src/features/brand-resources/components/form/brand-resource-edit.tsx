"use client";

import { revalidate } from "@/actions/reavalidate";
import { CustomButton } from "@/components/custom-button";
import { DeleteDialog } from "@/components/delete-dialog";
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
import {
  Form,
  FormControl,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { brandResourceTypes } from "@/constants/brand-resource-types";
import { ACTION_MESSAGES } from "@/constants/messages";
import { brandResourcesMeta } from "@/constants/page-titles/brand-resources";
import { brandsMeta } from "@/constants/page-titles/brands";
import { FormError } from "@/features/auth/components/form-error";
import { useCurrentRole } from "@/features/auth/hooks/use-current-role";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Prisma, UserRole } from "@prisma/client";
import { Check, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "sonner";
import { z } from "zod";
import { deleteBrandResource } from "../../actions/delete-brand-resource";
import { editBrandResource } from "../../actions/edit-brand-resource";
import { BrandResourceSchema } from "../../schemas/brand-resource-schema";

interface Props {
  brandResource: Prisma.dl_brand_resourceGetPayload<{
    include: {
      brand: true;
    };
  }>;
  brands: Prisma.dl_brandGetPayload<{
    include: {
      createdBy: true;
      updatedBy: true;
    };
  }>[];
}

export const BrandResourceEditForm = ({ brandResource, brands }: Props) => {
  const [error, setError] = useState<string | undefined>();
  const [brand, setBrand] = useState<string | null>(
    brandResource.brand?.logo || null,
  );
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const userRole = useCurrentRole();

  const form = useForm<z.infer<typeof BrandResourceSchema>>({
    resolver: zodResolver(BrandResourceSchema),
    defaultValues: {
      name: brandResource.name || undefined,
      type: brandResource.type,
      url: brandResource.url || undefined,
      brand: brandResource.brandId,
    },
  });

  const onSubmit = async (values: z.infer<typeof BrandResourceSchema>) => {
    setError(undefined);

    startTransition(() => {
      editBrandResource(values, brandResource.id)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            toast.success(data.success);
            router.push(brandResourcesMeta.href);
          }
          revalidate();
        })
        .catch(() => toast.success(ACTION_MESSAGES().WENT_WRONG));
    });
  };

  const onDelete = () => {
    startTransition(() => {
      deleteBrandResource(brandResource.id)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            toast.success(data.success);
            router.push(brandResourcesMeta.href);
          }
          revalidate();
        })
        .catch(() => setError(ACTION_MESSAGES().WENT_WRONG));
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Default logo"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select
                  disabled={isPending}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={`Select a ${brandResourcesMeta.label.singular.toLowerCase()}`}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {brandResourceTypes().map((type) => (
                      <SelectItem value={type} key={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Url</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="https://site.com/image.svg"
                    type="text"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem className="flex flex-col @4xl:col-span-3">
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
                    <PopoverContent className="w-full p-0" align="start">
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
                      }}
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
            buttonLabel={`Update ${brandResourcesMeta.label.singular.toLowerCase()}`}
            type="submit"
            hideLabelOnMobile={false}
            disabled={isPending}
          />
          {userRole !== UserRole.USER && (
            <DeleteDialog
              label={brandResource.name}
              asset={brandResourcesMeta.label.singular.toLowerCase()}
              onDelete={onDelete}
              hideLabelOnMobile={false}
              disabled={isPending}
            />
          )}
        </div>
      </form>
    </Form>
  );
};
