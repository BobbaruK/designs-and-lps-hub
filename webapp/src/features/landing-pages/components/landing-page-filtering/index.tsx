"use client";

import { CustomButton } from "@/components/custom-button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { landingPagesMeta } from "@/constants/page-titles/landing-pages";
import {
  BrandMinimal,
  FeatureMinimal,
  LandingPageTypeMinimal,
  LanguageMinimal,
  LicenseMinimal,
  RegistrationTypeMinimal,
  TopicMinimal,
} from "@/types/minimals";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { RiResetLeftLine } from "react-icons/ri";
import { ByBrands } from "./by-brands";
import { ByFeatures } from "./by-features";
import { ByHasWhatsapp } from "./by-has-whatsapp";
import { ByIsArts } from "./by-is-arts";
import { ByIsReadyForTraffic } from "./by-is-ready-for-traffic";
import { ByLandingPageTypes } from "./by-landing-page-types";
import { ByLanguages } from "./by-languages";
import { ByLicenses } from "./by-licenses";
import { ByRegistrationTypes } from "./by-registration-types";
import { ByTopics } from "./by-topics";
import { Operator } from "./operator";

interface Props {
  features?: FeatureMinimal[] | null;
  topics?: TopicMinimal[] | null;
  licenses?: LicenseMinimal[] | null;
  landingPageTypes?: LandingPageTypeMinimal[] | null;
  registrationTypes?: RegistrationTypeMinimal[] | null;
  languages?: LanguageMinimal[] | null;
  brands?: BrandMinimal[] | null;
  showResetAll: boolean;
}

export const LandingPageFiltering = ({
  features,
  topics,
  licenses,
  landingPageTypes,
  registrationTypes,
  languages,
  brands,
  showResetAll,
}: Props) => {
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();
  // const isDesktop = useMediaQuery("(min-width: 768px)");

  // const [open, setOpen] = useState(false);

  // if (isDesktop)
  //   return (
  //     <>
  //       <Popover open={open} onOpenChange={setOpen}>
  //         <PopoverTrigger asChild>
  //           <CustomButton
  //             buttonLabel={`Filters`}
  //             variant={"outline"}
  //             size={"sm"}
  //             icon={FaFilter}
  //             iconPlacement="left"
  //           />
  //         </PopoverTrigger>
  //         <PopoverContent
  //           align="start"
  //           className="h-[250px] w-[450px] overflow-y-auto p-0 lg:h-[400px] lg:w-[700px] xl:h-[700px] xl:w-[900px]"
  //         >
  //           {/* <ScrollArea className="h-full w-full"> */}
  //           <div className="p-4">
  //             <div className="flex flex-wrap items-center justify-between gap-4 lg:gap-10">
  //               <Operator
  //                 isLoading={isLoading}
  //                 startTransition={startTransition}
  //               />

  //               {showResetAll && (
  //                 <CustomButton
  //                   buttonLabel={`Reset all filters`}
  //                   variant={"outline"}
  //                   size={"sm"}
  //                   icon={RiResetLeftLine}
  //                   iconPlacement="left"
  //                   disabled={isLoading}
  //                   onClick={() =>
  //                     startTransition(() =>
  //                       router.push(landingPagesMeta.href, { scroll: false }),
  //                     )
  //                   }
  //                 />
  //               )}
  //             </div>
  //             <div className="flex flex-wrap justify-between gap-6">
  //               <ByFeatures
  //                 isLoading={isLoading}
  //                 startTransition={startTransition}
  //                 features={features}
  //                 className="grow"
  //               />
  //               <ByBrands
  //                 isLoading={isLoading}
  //                 startTransition={startTransition}
  //                 brands={brands}
  //                 className="grow"
  //               />
  //               <ByRegistrationTypes
  //                 isLoading={isLoading}
  //                 startTransition={startTransition}
  //                 registrationTypes={registrationTypes}
  //                 className="grow"
  //               />
  //               <ByLanguages
  //                 isLoading={isLoading}
  //                 startTransition={startTransition}
  //                 languages={languages}
  //                 className="grow"
  //               />
  //               <ByTopics
  //                 isLoading={isLoading}
  //                 startTransition={startTransition}
  //                 topics={topics}
  //                 className="grow"
  //               />
  //               <ByLicenses
  //                 isLoading={isLoading}
  //                 startTransition={startTransition}
  //                 licenses={licenses}
  //                 className="grow"
  //               />
  //               <ByLandingPageTypes
  //                 isLoading={isLoading}
  //                 startTransition={startTransition}
  //                 landingPageTypes={landingPageTypes}
  //                 className="grow"
  //               />
  //               <Card className="flex grow flex-col rounded-md shadow-md">
  //                 <ByIsBoolean
  //                   isLoading={isLoading}
  //                   startTransition={startTransition}
  //                   searchParamQuery="isArts"
  //                   label="Is ARTS?"
  //                 />
  //                 <Separator />
  //                 <ByIsBoolean
  //                   isLoading={isLoading}
  //                   startTransition={startTransition}
  //                   searchParamQuery="isReadyForTraffic"
  //                   label="Is ready for traffic?"
  //                 />
  //                 <Separator />
  //                 <ByIsBoolean
  //                   isLoading={isLoading}
  //                   startTransition={startTransition}
  //                   searchParamQuery="whatsapp"
  //                   label="Has Whatsapp functionality?"
  //                 />
  //               </Card>
  //             </div>
  //           </div>
  //           {/* </ScrollArea> */}
  //         </PopoverContent>
  //       </Popover>
  //     </>
  //   );

  // return (
  //   <Drawer open={open} onOpenChange={setOpen}>
  //     <DrawerTrigger asChild>
  //       <CustomButton
  //         buttonLabel={`Filters`}
  //         variant={"outline"}
  //         size={"sm"}
  //         icon={FaFilter}
  //         iconPlacement="left"
  //       />
  //     </DrawerTrigger>

  //     <DrawerContent className="max-h-[80%]">
  //       <DrawerHeader className="text-left">
  //         <DrawerTitle>Filters</DrawerTitle>
  //         <DrawerDescription>
  //           Add filters to refine your rows.
  //         </DrawerDescription>
  //       </DrawerHeader>
  //       <div className="flex flex-col gap-4 overflow-y-auto p-4">
  //         <div className="flex flex-wrap items-center justify-between gap-4 lg:gap-10">
  //           <Operator isLoading={isLoading} startTransition={startTransition} />

  //           {showResetAll && (
  //             <CustomButton
  //               buttonLabel={`Reset all filters`}
  //               variant={"outline"}
  //               size={"sm"}
  //               icon={RiResetLeftLine}
  //               iconPlacement="left"
  //               disabled={isLoading}
  //               onClick={() =>
  //                 startTransition(() =>
  //                   router.push(landingPagesMeta.href, { scroll: false }),
  //                 )
  //               }
  //             />
  //           )}
  //         </div>
  //         <div className="flex flex-wrap justify-between gap-6">
  //           <ByFeatures
  //             isLoading={isLoading}
  //             startTransition={startTransition}
  //             features={features}
  //             className="grow"
  //           />
  //           <ByBrands
  //             isLoading={isLoading}
  //             startTransition={startTransition}
  //             brands={brands}
  //             className="grow"
  //           />
  //           <ByRegistrationTypes
  //             isLoading={isLoading}
  //             startTransition={startTransition}
  //             registrationTypes={registrationTypes}
  //             className="grow"
  //           />
  //           <ByLanguages
  //             isLoading={isLoading}
  //             startTransition={startTransition}
  //             languages={languages}
  //             className="grow"
  //           />
  //           <ByTopics
  //             isLoading={isLoading}
  //             startTransition={startTransition}
  //             topics={topics}
  //             className="grow"
  //           />
  //           <ByLicenses
  //             isLoading={isLoading}
  //             startTransition={startTransition}
  //             licenses={licenses}
  //             className="grow"
  //           />
  //           <ByLandingPageTypes
  //             isLoading={isLoading}
  //             startTransition={startTransition}
  //             landingPageTypes={landingPageTypes}
  //             className="grow"
  //           />
  //           <Card className="flex grow flex-col rounded-md shadow-md">
  //             <ByIsBoolean
  //               isLoading={isLoading}
  //               startTransition={startTransition}
  //               searchParamQuery="isArts"
  //               label="Is ARTS?"
  //             />
  //             <Separator />
  //             <ByIsBoolean
  //               isLoading={isLoading}
  //               startTransition={startTransition}
  //               searchParamQuery="isReadyForTraffic"
  //               label="Is ready for traffic?"
  //             />
  //             <Separator />
  //             <ByIsBoolean
  //               isLoading={isLoading}
  //               startTransition={startTransition}
  //               searchParamQuery="whatsapp"
  //               label="Has Whatsapp functionality?"
  //             />
  //           </Card>
  //         </div>
  //       </div>
  //       <DrawerFooter className="flex flex-col pt-2 sm:flex-row">
  //         <DrawerClose asChild>
  //           <CustomButton buttonLabel={`Close`} variant={"destructive"} />
  //         </DrawerClose>
  //       </DrawerFooter>
  //     </DrawerContent>
  //   </Drawer>
  // );

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="border-0">
        <AccordionTrigger className="pt-0">Advance filtering</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4 lg:gap-10">
            <Operator isLoading={isLoading} startTransition={startTransition} />

            {showResetAll && (
              <CustomButton
                buttonLabel={`Reset all filters`}
                variant={"outline"}
                size={"sm"}
                icon={RiResetLeftLine}
                iconPlacement="left"
                disabled={isLoading}
                onClick={() =>
                  startTransition(() =>
                    router.push(landingPagesMeta.href, { scroll: false }),
                  )
                }
              />
            )}
          </div>
          <div className="flex flex-wrap justify-between gap-6">
            <ByFeatures
              isLoading={isLoading}
              startTransition={startTransition}
              features={features}
              className="grow"
            />
            <ByBrands
              isLoading={isLoading}
              startTransition={startTransition}
              brands={brands}
              className="grow"
            />
            <ByRegistrationTypes
              isLoading={isLoading}
              startTransition={startTransition}
              registrationTypes={registrationTypes}
              className="grow"
            />
            <ByLanguages
              isLoading={isLoading}
              startTransition={startTransition}
              languages={languages}
              className="grow"
            />
            <ByTopics
              isLoading={isLoading}
              startTransition={startTransition}
              topics={topics}
              className="grow"
            />
            <ByLicenses
              isLoading={isLoading}
              startTransition={startTransition}
              licenses={licenses}
              className="grow"
            />
            <ByLandingPageTypes
              isLoading={isLoading}
              startTransition={startTransition}
              landingPageTypes={landingPageTypes}
              className="grow"
            />
            <Card className="flex grow flex-col rounded-md shadow-md">
              <ByIsArts
                isLoading={isLoading}
                startTransition={startTransition}
              />
              <Separator />
              <ByIsReadyForTraffic
                isLoading={isLoading}
                startTransition={startTransition}
              />
              <Separator />
              <ByHasWhatsapp
                isLoading={isLoading}
                startTransition={startTransition}
              />
            </Card>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
