"use client";

import { revalidate } from "@/actions/reavalidate";
import { CustomButton } from "@/components/custom-button";
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
import { ACTION_MESSAGES } from "@/constants";
import { FormError } from "@/features/auth/components";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { addUserAvatar } from "../../actions/add-user-avatar";
import { UserAvatarSchema } from "../../schemas/user-avatar-schema";

export const UserAvatarAdd = () => {
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof UserAvatarSchema>>({
    resolver: zodResolver(UserAvatarSchema),
    defaultValues: {
      name: "",
      url: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof UserAvatarSchema>) => {
    setError(undefined);

    startTransition(() => {
      addUserAvatar(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            toast.success(data.success);
            router.push("/user-avatars");
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
                    placeholder="Screwie"
                    disabled={isPending}
                  />
                </FormControl>
                <FormDescription>
                  Name generator{" "}
                  <Link
                    href={
                      "https://www.fantasynamegenerators.com/robot-names.php"
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
                    type="text"
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
          buttonLabel="Add user avatar"
          type="submit"
          disabled={isPending}
        />
      </form>
    </Form>
  );
};
