"use client";

import { revalidate } from "@/actions/reavalidate";
import { CustomAvatar } from "@/components/custom-avatar";
import { CustomButton } from "@/components/custom-button";
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
import { ACTION_MESSAGES } from "@/constants/messages";
import { FormError } from "@/features/auth/components/form-error";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Prisma } from "@prisma/client";
import { Check, ChevronsUpDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { addLanguage } from "../../actions/add-language";
import { LanguageSchema } from "../../schemas/language-schema";

interface Props {
  flags: Prisma.dl_avatar_flagGetPayload<{
    include: {
      createdBy: true;
      updatedBy: true;
    };
  }>[];
}

export const LanguageAddForm = ({ flags }: Props) => {
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof LanguageSchema>>({
    resolver: zodResolver(LanguageSchema),
    defaultValues: {
      name: "",
      englishName: "",
      iso_639_1: "",
      iso_3166_1: "",
      flag: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LanguageSchema>) => {
    setError(undefined);

    startTransition(() => {
      addLanguage(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            toast.success(data.success);
            router.push("/languages");
          }
          revalidate();
        })
        .catch(() => setError(ACTION_MESSAGES().WENT_WRONG));
    });
  };

  const onResetAvatar = () => {
    form.setValue("flag", "");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="englishName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>English name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Romanian"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Română" disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="iso_639_1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ISO 639 1</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="ro" disabled={isPending} />
                </FormControl>
                <FormDescription>
                  <Link
                    href={"https://www.iso.org/iso-639-language-code"}
                    className="underline underline-offset-2"
                    target="_blank"
                  >
                    https://www.iso.org/iso-639-language-code
                  </Link>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="iso_3166_1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ISO 3166 1</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="RO" disabled={isPending} />
                </FormControl>
                <FormDescription>
                  <Link
                    href={"https://www.iso.org/iso-3166-country-codes.html"}
                    className="underline underline-offset-2"
                    target="_blank"
                  >
                    https://www.iso.org/iso-3166-country-codes.html
                  </Link>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="flag"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="self-start">Flag</FormLabel>
                <div className="flex flex-row items-center gap-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl className="w-full">
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value
                            ? flags?.find((flag) => flag.url === field.value)
                                ?.name
                            : "Select flag"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search flag..." />
                        <CommandList>
                          <CommandEmpty>No flag found.</CommandEmpty>
                          <CommandGroup>
                            {flags
                              ?.sort((a, b) => {
                                const nameA = a.name.toUpperCase();
                                const nameB = b.name.toUpperCase();
                                if (nameA < nameB) {
                                  return -1;
                                }
                                if (nameA > nameB) {
                                  return 1;
                                }

                                return 0;
                              })
                              .map((flag) => (
                                <CommandItem
                                  value={flag.name}
                                  key={flag.id}
                                  onSelect={() => {
                                    form.setValue("flag", flag.url);
                                  }}
                                  className="flex items-center gap-0"
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      flag.url === field.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                  <div className="flex items-center gap-4">
                                    <CustomAvatar
                                      image={flag.url}
                                      className="size-7"
                                    />
                                    {flag.name}
                                  </div>
                                </CommandItem>
                              ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription className="flex items-center gap-4">
                    <CustomAvatar image={form.getValues("flag")} />
                    {form.getValues("flag") && (
                      <Button
                        size={"sm"}
                        variant={"link"}
                        className="text-foreground"
                        onClick={onResetAvatar}
                        type="button"
                      >
                        Remove flag
                      </Button>
                    )}
                  </FormDescription>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormError message={error} />
        <CustomButton
          buttonLabel="Add Language"
          type="submit"
          disabled={isPending}
        />
      </form>
    </Form>
  );
};