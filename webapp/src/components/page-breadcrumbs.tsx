"use client";

import type { IBreadcrumb } from "@/types";
import Link from "next/link";
import React, { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";
import { CustomButton } from "./custom-button";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { SidebarTrigger } from "./ui/sidebar";
import { Skeleton } from "./ui/skeleton";

interface Props {
  crumbs: IBreadcrumb[];
}

export const PageBreadcrumbs = ({ crumbs }: Props) => {
  const [open, setOpen] = React.useState(false);
  const matches = useMediaQuery("(min-width: 576px)");
  const [componentLoaded, setComponentLoaded] = React.useState(false);

  useEffect(() => {
    setComponentLoaded(true);
    return () => {};
  }, [setComponentLoaded]);

  return (
    <div className="flex items-center gap-10 py-4 md:py-6">
      <SidebarTrigger />

      {componentLoaded ? (
        <Breadcrumb>
          {matches || crumbs.length <= 2 ? (
            <BreadcrumbList>
              {crumbs.map((crumb, index) => {
                return (
                  <React.Fragment
                    key={`${crumb.label.replaceAll(" ", "")}-index`}
                  >
                    {crumbs.length - 1 !== index ? (
                      <>
                        <BreadcrumbItem>
                          {crumb.href ? (
                            <BreadcrumbLink asChild>
                              <Link href={crumb.href}>{crumb.label}</Link>
                            </BreadcrumbLink>
                          ) : (
                            <span>{crumb.label}</span>
                          )}
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                      </>
                    ) : (
                      <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                    )}
                  </React.Fragment>
                );
              })}
            </BreadcrumbList>
          ) : (
            <BreadcrumbList>
              <BreadcrumbLink asChild>
                <Link href={crumbs[0].href || ""}>{crumbs[0].label}</Link>
              </BreadcrumbLink>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <Drawer open={open} onOpenChange={setOpen}>
                  <DrawerTrigger aria-label="Toggle Menu">
                    <BreadcrumbEllipsis className="h-4 w-4" />
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader className="text-left">
                      <DrawerTitle>Navigate to</DrawerTitle>
                      <DrawerDescription>
                        Select a page to navigate to.
                      </DrawerDescription>
                    </DrawerHeader>
                    <div className="grid gap-1 px-4">
                      {crumbs.map((crumb, index) => {
                        if (crumbs.length - 1 === index || index == 0) return;

                        if (crumb.href)
                          return (
                            <Link
                              key={index}
                              href={crumb.href ? crumb.href : "#"}
                              className="py-1 text-sm"
                            >
                              {crumb.label}
                            </Link>
                          );

                        return (
                          <span key={index} className="text-sm">
                            {crumb.label}
                          </span>
                        );
                      })}
                    </div>
                    <DrawerFooter className="pt-4">
                      <DrawerClose asChild>
                        <CustomButton
                          buttonLabel={`Close`}
                          variant={"outline"}
                        />
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbPage>{crumbs[crumbs.length - 1].label}</BreadcrumbPage>
            </BreadcrumbList>
          )}
        </Breadcrumb>
      ) : (
        <Skeleton className="h-[20px] w-[200px] rounded-full" />
      )}
    </div>
  );
};
