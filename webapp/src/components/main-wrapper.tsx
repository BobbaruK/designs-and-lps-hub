"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { useSidebar } from "./ui/sidebar";
import { Separator } from "./ui/separator";

interface Props {
  children: ReactNode;
}

export const MainWrapper = ({ children }: Props) => {
  const { isMobile, state } = useSidebar();

  return (
    // TODO: this shit make cls on mobile
    <div
      className={cn("flex w-full flex-col transition-[width] duration-200", {
        "w-full": isMobile,
        "w-[calc(100%-var(--sidebar-width))]":
          !isMobile && state === "expanded",
        "w-[calc(100%-var(--sidebar-width-icon)-1rem)]":
          !isMobile && state === "collapsed",
      })}
    >
      <main>{children}</main>
      <footer className="mb-1 mt-auto">
        <div className="container">
          <Separator className="mb-4" />
          footer
        </div>
      </footer>
    </div>
  );
};
