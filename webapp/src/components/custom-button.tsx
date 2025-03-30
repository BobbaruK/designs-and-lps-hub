"use client";

import { BUTTON_EFFECT } from "@/constants/button";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { Button, ButtonIconProps, buttonVariants } from "./ui/button";

interface Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  buttonLabel: string;
  linkHref?: string;
  hideLabelOnMobile?: boolean;
  target?: React.HTMLAttributeAnchorTarget;
}

const CustomButton = React.forwardRef<
  HTMLButtonElement,
  Props & ButtonIconProps
>(
  (
    {
      buttonLabel,
      linkHref = "",
      hideLabelOnMobile = true,
      target,
      ...restProps
    },
    ref,
  ) => {
    const matches = useMediaQuery("(min-width: 992px)");
    const [componentLoaded, setComponentLoaded] = useState(false);

    const spanClasses =
      !matches && restProps.icon && hideLabelOnMobile ? "hidden lg:inline" : "";

    useEffect(() => {
      setComponentLoaded(true);

      return () => setComponentLoaded(false);
    }, []);

    if (linkHref)
      return (
        <>
          {componentLoaded ? (
            <Button
              ref={ref}
              size={
                !matches && restProps.icon && hideLabelOnMobile
                  ? "icon"
                  : restProps.size
              }
              {...restProps}
              className={cn("gap-2", restProps.className)}
              effect={restProps.effect || BUTTON_EFFECT}
              asChild
            >
              <Link href={linkHref} target={target}>
                {restProps.size !== "icon" && (
                  <span className={cn(spanClasses)}>{buttonLabel}</span>
                )}
              </Link>
            </Button>
          ) : (
            <ButtonSkeleton />
          )}
        </>
      );

    return (
      <>
        {componentLoaded ? (
          <Button
            ref={ref}
            size={
              !matches && restProps.icon && hideLabelOnMobile
                ? "icon"
                : restProps.size
            }
            {...restProps}
            className={cn("gap-2", restProps.className)}
            effect={restProps.effect || BUTTON_EFFECT}
          >
            {restProps.size !== "icon" && (
              <span className={cn(spanClasses)}>{buttonLabel}</span>
            )}
          </Button>
        ) : (
          <ButtonSkeleton />
        )}
      </>
    );
  },
);

CustomButton.displayName = "CustomButton";

export { CustomButton };

function ButtonSkeleton() {
  return <Button size={"icon"} variant={"secondary"} className="flex"></Button>;
}
