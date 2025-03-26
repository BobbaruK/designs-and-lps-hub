"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { LP_SearchParams } from "@/types/landing-pages";
import { Prisma } from "@prisma/client";
import { useRouter } from "next/navigation";

interface Props {
  features?: Prisma.dl_featuresGetPayload<{
    select: {
      id: true;
      slug: true;
      name: true;
    };
  }>[];
  searchParams?: LP_SearchParams;
}

export const LandingPageFiltering = ({ features, searchParams }: Props) => {
  const router = useRouter();

  // const searchParams = new URLSearchParams();
  // const featuresValues = searchParams.getAll("feature");
  const urlParams = new URLSearchParams();

  console.log({ searchParams });
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="border-0">
        <AccordionTrigger className="pt-0">Advance search</AccordionTrigger>
        <AccordionContent className="">
          <div className="flex flex-col gap-2">
            <div>Features</div>
            <div className="flex flex-col gap-1">
              {features?.map((feature) => {
                // console.log({ searchParams });
                // console.log({ featuresValues });
                // console.log({ checked });

                return (
                  <div key={feature.id} className="flex items-center gap-2">
                    <Checkbox
                      id={feature.slug}
                      checked={
                        searchParams?.feature?.includes(feature.slug) || false
                      }
                      onCheckedChange={(e) => {
                        console.log(
                          searchParams?.feature?.includes(feature.slug),
                        );
                        if (searchParams?.feature?.includes(feature.slug)) {
                          urlParams.delete("feature", feature.slug);
                        } else {
                          urlParams.append("feature", feature.slug);
                        }

                        // console.log({ featuresValues });
                        // if (featuresValues.includes(feature.slug)) {
                        //   searchParams.delete("feature", feature.slug);
                        // } else {
                        //   searchParams.append("feature", feature.slug);
                        // }
                        // console.log({ featuresValues });
                        // console.log({
                        //   searchParams: `/landing-pages?${searchParams.toString()}`,
                        // });
                        router.push(`/landing-pages?${urlParams.toString()}`);
                      }}
                    />

                    <Label htmlFor={feature.slug}>{feature.name}</Label>
                  </div>
                );
              })}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
