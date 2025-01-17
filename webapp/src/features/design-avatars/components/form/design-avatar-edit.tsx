"use client";

import { revalidate } from "@/actions/reavalidate";
import { CustomButton } from "@/components/custom-button";
import { DeleteDialog } from "@/components/delete-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormError } from "@/features/auth/components";
import { useCurrentRole } from "@/features/auth/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { dl_avatar_design } from "@prisma/client";
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
        .catch(() => setError("Something went wrong!"));
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
        .catch(() => setError("Something went wrong!"));
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
                    placeholder="Brand Logo"
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
            buttonLabel={`Update design avatar`}
            type="submit"
            hideLabelOnMobile={false}
            disabled={isPending}
          />
          {userRole !== "USER" && (
            <DeleteDialog
              label={designAvatar.name}
              asset={"design avatar"}
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