"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "next-themes";
import { useState } from "react";
import { useIsClient } from "usehooks-ts";

export const ThemeSection = () => {
  const isClient = useIsClient();
  const { setTheme, theme } = useTheme();
  const [theTheme, setTheTheme] = useState(theme);

  return (
    <div className="space-y-4">
      <h3 className="pb-4 text-heading3">Theme</h3>

      {isClient ? (
        <RadioGroup
          defaultValue={theme}
          value={theTheme}
          onValueChange={setTheTheme}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              id="light"
              value="light"
              onClick={() => setTheme("light")}
              className="cursor-pointer"
            />
            <Label htmlFor="light" className="cursor-pointer">
              Light
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              id="dark"
              value="dark"
              onClick={() => setTheme("dark")}
              className="cursor-pointer"
            />
            <Label htmlFor="dark" className="cursor-pointer">
              Dark
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              id="system"
              value="system"
              onClick={() => setTheme("system")}
              className="cursor-pointer"
            />
            <Label htmlFor="system" className="cursor-pointer">
              System
            </Label>
          </div>
        </RadioGroup>
      ) : (
        <div className="grid gap-2">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-[16px] w-[16px] rounded-full" />
            <Skeleton className="h-[16px] w-[70px] rounded-full" />
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton className="h-[16px] w-[16px] rounded-full" />
            <Skeleton className="h-[16px] w-[70px] rounded-full" />
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton className="h-[16px] w-[16px] rounded-full" />
            <Skeleton className="h-[16px] w-[70px] rounded-full" />
          </div>
        </div>
      )}
    </div>
  );
};

