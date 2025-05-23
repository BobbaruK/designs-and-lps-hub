"use client";

import { CustomButton } from "@/components/custom-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { newPassword } from "../actions/new-password";
import { NewPasswordSchema } from "../schemas/new-password";
import { CardWrapper } from "./card-wrapper";
import { FormError } from "./form-error";

interface Props {
  searchParamToken: string;
}

export const NewPasswordForm = ({ searchParamToken }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const router = useRouter();

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("");

    startTransition(() => {
      newPassword(values, searchParamToken).then((data) => {
        if (data.success) {
          toast.success(data.success);
          router.push("/auth/login");
        }

        if (data.error) {
          setError(data.error);
        }
      });
    });
  };
  return (
    <CardWrapper
      headerLabel={"Enter a new password"}
      backButtonLabel={"Back to login"}
      backButtonHref={"/auth/login/"}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="******"
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
            type="submit"
            buttonLabel="Reset password"
            className="w-full"
            disabled={isPending}
          />
        </form>
      </Form>
    </CardWrapper>
  );
};
