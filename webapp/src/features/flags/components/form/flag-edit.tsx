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
import { ACTION_MESSAGES } from "@/constants/messages";
import { FormError } from "@/features/auth/components/form-error";
import { useCurrentRole } from "@/features/auth/hooks/use-current-role";
import { zodResolver } from "@hookform/resolvers/zod";
import { dl_avatar_flag, UserRole } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { deleteFlag } from "../../actions/delete-flag";
import { editFlag } from "../../actions/edit-flag";
import { FlagsSchema } from "../../schemas/flags-schema";

interface Props {
  flag: dl_avatar_flag;
}

export const FlagEditForm = ({ flag }: Props) => {
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const userRole = useCurrentRole();

  const form = useForm<z.infer<typeof FlagsSchema>>({
    resolver: zodResolver(FlagsSchema),
    defaultValues: {
      name: flag.name || undefined,
      url: flag.url || undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof FlagsSchema>) => {
    setError(undefined);

    startTransition(() => {
      editFlag(values, flag.id)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            toast.success(data.success);
            router.push("/flags");
          }

          revalidate();
        })
        .catch(() => setError(ACTION_MESSAGES().WENT_WRONG));
    });
  };

  const onDelete = () => {
    startTransition(() => {
      deleteFlag(flag.id)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            toast.success(data.success);
            router.push(`/flags`);
          }
          revalidate();
        })
        .catch(() => toast.success(ACTION_MESSAGES().WENT_WRONG));
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
                    placeholder="Avatar 1"
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
            buttonLabel={`Update Flag`}
            type="submit"
            hideLabelOnMobile={false}
            disabled={isPending}
          />
          {userRole !== UserRole.USER && (
            <DeleteDialog
              label={flag.name}
              asset={"Flag"}
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
