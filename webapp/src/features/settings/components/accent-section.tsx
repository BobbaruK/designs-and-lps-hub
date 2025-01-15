"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import { retainClasses } from "@/lib/utils";
import { useState } from "react";
import { useIsClient, useLocalStorage } from "usehooks-ts";

export const AccentSection = () => {
  // TODO: Save accent in a store (zustand)
  const isClient = useIsClient();
  const [
    value,
    setValue,
    // removeValue
  ] = useLocalStorage("accent", "");
  const [theAccent, setTheAccent] = useState<string>(value);

  const accents: {
    id: number;
    name: string;
  }[] = [
    {
      id: 0,
      name: "Zinc",
    },
    {
      id: 1,
      name: "Red",
    },
    {
      id: 2,
      name: "Rose",
    },
    {
      id: 3,
      name: "Orange",
    },
    {
      id: 4,
      name: "Green",
    },
    {
      id: 5,
      name: "Blue",
    },
    {
      id: 6,
      name: "Yellow",
    },
    {
      id: 7,
      name: "Violet",
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="pb-4 text-heading3">Accent</h3>

      {isClient ? (
        <RadioGroup
          defaultValue={value}
          value={theAccent}
          onValueChange={(e) => {
            setTheAccent(e);
            const html = document.querySelector("html") as HTMLHtmlElement;

            retainClasses(html, ["light", "dark"]);

            html.classList.add(e);
            setValue(e);
          }}
        >
          {accents.map((acc) => (
            <div className="flex items-center space-x-2" key={acc.id}>
              <RadioGroupItem
                value={`accent-theme-${acc.id}`}
                id={`accent-theme-${acc.id}`}
              />
              <Label
                htmlFor={`accent-theme-${acc.id}`}
                className="cursor-pointer"
              >
                {acc.name}
              </Label>
            </div>
          ))}
        </RadioGroup>
      ) : (
        <>
          <div className="grid gap-2">
            {accents.map((acc) => (
              <div className="flex items-center space-x-2" key={acc.id}>
                <Skeleton className="h-[16px] w-[16px] rounded-full" />
                <Skeleton className="h-[16px] w-[70px] rounded-full" />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
