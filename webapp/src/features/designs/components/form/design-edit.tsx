"use client";

import { revalidate } from "@/actions/reavalidate";
import { CustomButton } from "@/components/custom-button";
import { DeleteDialog } from "@/components/delete-dialog";
import MultipleSelector from "@/components/ui/expansions/multiple-selector";
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
import { useCurrentRole } from "@/features/auth/hooks/use-current-role";
import { zodResolver } from "@hookform/resolvers/zod";
import { Prisma, UserRole } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { deleteDesign } from "../../actions/delete-design";
import { editDesign } from "../../actions/edit-design";
import { DesignSchema } from "../../schemas/design-schema";

interface Props {
  design: Prisma.dl_designGetPayload<{
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
      landingPages: {
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
          registrationType: true;
          language: true;
          license: true;
          landingPageType: true;
          requester: {
            omit: {
              password: true;
            };
          };
          topic: true;
          features: true;
        };
      };
      avatars: {
        select: {
          id: true;
          name: true;
          url: true;
          isUsed: true;
        };
      };
    };
  }>;
  avatars: Prisma.dl_avatar_designGetPayload<{
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
}

export const DesignEditForm = ({ design, avatars }: Props) => {
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const userRole = useCurrentRole();

  const form = useForm<z.infer<typeof DesignSchema>>({
    resolver: zodResolver(DesignSchema),
    defaultValues: {
      name: design.name || undefined,
      slug: design.slug || undefined,
      avatars: design.avatars.map((avatar) => ({
        label: avatar.name,
        value: avatar.id,
        avatarUrl: avatar.url,
        disable: avatar.isUsed,
      })),
    },
  });

  const onSubmit = async (values: z.infer<typeof DesignSchema>) => {
    setError(undefined);

    startTransition(() => {
      editDesign(values, design.id)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            toast.success(data.success);
            router.push(`${designsMeta.href}/${form.getValues("slug")}`);
          }

          revalidate();
        })
        .catch(() => toast.success(ACTION_MESSAGES().WENT_WRONG));
    });
  };

  const onDelete = () => {
    startTransition(() => {
      deleteDesign(design.id)
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
                    defaultOptions={avatars.map((avatar) => ({
                      label: avatar.name,
                      value: avatar.id,
                      avatarUrl: avatar.url,
                      disable: avatar.isUsed,
                    }))}
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

        <div className="flex gap-4">
          <CustomButton
            buttonLabel={`Update ${designsMeta.label.singular.toLowerCase()}`}
            type="submit"
            hideLabelOnMobile={false}
            disabled={isPending}
          />
          {userRole !== UserRole.USER && (
            <DeleteDialog
              label={design.name}
              asset={designsMeta.label.singular.toLowerCase()}
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
