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
import { reset } from "../actions/reset";
import { ResetSchema } from "../schemas/reset-password";
import { CardWrapper } from "./card-wrapper";
import { FormError } from "./form-error";

export const ResetForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const router = useRouter();

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError("");

    startTransition(() => {
      reset(values).then((data) => {
        if (data.error) {
          setError(data?.error);
        }

        if (data.success) {
          toast.success(data.success);
          router.push("/");
        }
      });
    });
  };
  return (
    <CardWrapper
      headerLabel={"Forgot your password?"}
      backButtonLabel={"Back to login"}
      backButtonHref={"/auth/login/"}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="john.doe@example.com"
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
            buttonLabel="Send reset email"
            className="w-full"
            disabled={isPending}
          />
        </form>
      </Form>
    </CardWrapper>
  );
};
