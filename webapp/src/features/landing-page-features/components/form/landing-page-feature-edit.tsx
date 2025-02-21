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
import { Textarea } from "@/components/ui/textarea";
import { ACTION_MESSAGES } from "@/constants/messages";
import { FormError } from "@/features/auth/components/form-error";
import { useCurrentRole } from "@/features/auth/hooks/use-current-role";
import { zodResolver } from "@hookform/resolvers/zod";
import { dl_features, UserRole } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { deleteLandingPageFeature } from "../../actions/delete-landing-page-feature";
import { editLandingPageFeature } from "../../actions/edit-landing-page-feature";
import { LandingPageFeatureSchema } from "../../schemas/landing-page-feature-schema";

interface Props {
  landingPageFeature: dl_features;
}

export const LandingPageFeatureEditForm = ({ landingPageFeature }: Props) => {
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const userRole = useCurrentRole();

  const form = useForm<z.infer<typeof LandingPageFeatureSchema>>({
    resolver: zodResolver(LandingPageFeatureSchema),
    defaultValues: {
      name: landingPageFeature.name,
      slug: landingPageFeature.slug,
      description: landingPageFeature.description || undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof LandingPageFeatureSchema>) => {
    setError(undefined);

    startTransition(() => {
      editLandingPageFeature(values, landingPageFeature.id)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            toast.success(data.success);
            router.push(`/features/${form.getValues("slug")}`);
          }

          revalidate();
        })
        .catch(() => toast.success(ACTION_MESSAGES().WENT_WRONG));
    });
  };

  const onDelete = () => {
    startTransition(() => {
      deleteLandingPageFeature(landingPageFeature.id)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            toast.success(data.success);
            router.push(`/features`);
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
                    placeholder="Feature"
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
                    placeholder="license"
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
                    placeholder="Feature description..."
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

        <div className="flex gap-4">
          <CustomButton
            buttonLabel={`Update Feature`}
            type="submit"
            hideLabelOnMobile={false}
            disabled={isPending}
          />
          {userRole !== UserRole.USER && (
            <DeleteDialog
              label={landingPageFeature.name}
              asset={"Feature"}
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
