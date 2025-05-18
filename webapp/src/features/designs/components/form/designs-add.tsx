"use client";

import { revalidate } from "@/actions/reavalidate";
import { CustomButton } from "@/components/custom-button";
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
import { ACTION_MESSAGES } from "@/constants/messages";
import { designAvatarsMeta } from "@/constants/page-titles/design-avatars";
import { designsMeta } from "@/constants/page-titles/designs";
import { FormError } from "@/features/auth/components/form-error";
import { zodResolver } from "@hookform/resolvers/zod";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { addDesign } from "../../actions/add-design";
import { DesignSchema } from "../../schemas/design-schema";

interface Props {
  designAvatars: Prisma.dl_avatar_designGetPayload<{
    include: {
      createdBy: {
        omit: {
          password: false;
        };
      };
      updatedBy: {
        omit: {
          password: false;
        };
      };
    };
  }>[];
  avatars: Option[];
}

export const DesignAddForm = ({
  // designAvatars,
  avatars,
}: Props) => {
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof DesignSchema>>({
    resolver: zodResolver(DesignSchema),
    defaultValues: {
      name: "",
      slug: "",
      avatars: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof DesignSchema>) => {
    setError(undefined);

    startTransition(() => {
      addDesign(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            toast.success(data.success);
            router.push(designsMeta.href);
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
                    placeholder="Snuybar"
                    disabled={isPending}
                  />
                </FormControl>
                <FormDescription>
                  Name generator{" "}
                  <Link
                    href={
                      "https://www.fantasynamegenerators.com/country-names.php"
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
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="snuybar"
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
            name="avatars"
            render={({ field }) => (
              <FormItem className="@lg:col-span-full">
                <FormLabel>{designAvatarsMeta.label.plural}</FormLabel>
                <FormControl>
                  <MultipleSelector
                    {...field}
                    defaultOptions={avatars}
                    hidePlaceholderWhenSelected
                    placeholder={`Select ${designAvatarsMeta.label.plural.toLowerCase()}...`}
                    emptyIndicator={
                      <p className="text-center text-gray-600 dark:text-gray-400">
                        no {designAvatarsMeta.label.plural.toLowerCase()} found.
                      </p>
                    }
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormError message={error} />
        <CustomButton
          buttonLabel={`Add ${designsMeta.label.singular.toLowerCase()}`}
          type="submit"
          disabled={isPending}
        />
      </form>
    </Form>
  );
};
