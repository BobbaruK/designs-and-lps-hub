"use client";

import { revalidate } from "@/actions/reavalidate";
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
import { Textarea } from "@/components/ui/textarea";
import { ACTION_MESSAGES } from "@/constants/messages";
import { FormError } from "@/features/auth/components/form-error";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { addLandingPageType } from "../../actions/add-landing-page-type";
import { LandingPageTypeSchema } from "../../schemas/landing-page-type-schema";

export const LandingPageTypeAddForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof LandingPageTypeSchema>>({
    resolver: zodResolver(LandingPageTypeSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LandingPageTypeSchema>) => {
    setError(undefined);

    startTransition(() => {
      addLandingPageType(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            toast.success(data.success);
            router.push("/landing-page-types");
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
                    placeholder="Landing Page Type"
                    disabled={isPending}
                  />
                </FormControl>
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
                    placeholder="landing-page-type"
                    type="text"
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Landing Page Type description..."
                    className="resize-y"
                    rows={5}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormError message={error} />
        <CustomButton
          buttonLabel="Add Landing Page Type"
          type="submit"
          disabled={isPending}
        />
      </form>
    </Form>
  );
};