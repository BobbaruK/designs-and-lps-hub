"use client";

import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { SidebarTrigger } from "./ui/sidebar";
import React from "react";
import type { IBreadcrumb } from "@/types";

interface Props {
  crumbs: IBreadcrumb[];
}

export const PageBreadcrumbs = ({ crumbs }: Props) => {
  return (
    <div className="flex items-center gap-10 py-4 md:py-6">
      <SidebarTrigger />
      <Breadcrumb>
        <BreadcrumbList>
          {crumbs.map((crumb, index) => {
            return (
              <React.Fragment key={`${crumb.label.replaceAll(" ", "")}-index`}>
                {crumbs.length - 1 !== index ? (
                  <>
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link href={"/dashboard"}>{crumb.label}</Link>
                      </BreadcrumbLink>
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
      </Breadcrumb>
    </div>
  );
};
