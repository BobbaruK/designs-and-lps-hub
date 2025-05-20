"use client";

import { revalidate } from "@/actions/reavalidate";
import { CustomButton } from "@/components/custom-button";
import { DeleteDialog } from "@/components/delete-dialog";
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
import { FormError } from "@/features/auth/components/form-error";
import { useCurrentRole } from "@/features/auth/hooks/use-current-role";
import { zodResolver } from "@hookform/resolvers/zod";
import { dl_avatar_design, UserRole } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { deleteDesignAvatar } from "../../actions/delete-design-avatar";
import { editDesignAvatar } from "../../actions/edit-design-avatar";
import { DesignAvatarSchema } from "../../schemas/design-avatar-schema";

interface Props {
  designAvatar: dl_avatar_design;
}

export const DesignAvatarEditForm = ({ designAvatar }: Props) => {
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const userRole = useCurrentRole();

  const form = useForm<z.infer<typeof DesignAvatarSchema>>({
    resolver: zodResolver(DesignAvatarSchema),
    defaultValues: {
      name: designAvatar.name || undefined,
      url: designAvatar.url || undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof DesignAvatarSchema>) => {
    setError(undefined);

    startTransition(() => {
      editDesignAvatar(values, designAvatar.id)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            toast.success(data.success);
            router.push("/design-avatars");
          }

          revalidate();
        })
        .catch(() => setError(ACTION_MESSAGES().WENT_WRONG));
    });
  };

  const onDelete = () => {
    startTransition(() => {
      deleteDesignAvatar(designAvatar.id)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            toast.success(data.success);
            router.push(`/design-avatars`);
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
                    placeholder="Cobross"
                    disabled={isPending}
                  />
                </FormControl>
                <FormDescription>
                  Name generator{" "}
                  <Link
                    href={
                      "https://www.fantasynamegenerators.com/pokemon-names.php"
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
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Url</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="https://site.com/image.svg"
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
            buttonLabel={`Update ${designAvatarsMeta.label.singular.toLowerCase()}`}
            type="submit"
            hideLabelOnMobile={false}
            disabled={isPending}
          />
          {userRole !== UserRole.USER && (
            <DeleteDialog
              label={designAvatar.name}
              asset={designAvatarsMeta.label.singular.toLowerCase()}
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
