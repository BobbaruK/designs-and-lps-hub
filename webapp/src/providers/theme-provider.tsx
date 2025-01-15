"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useLocalStorage } from "usehooks-ts";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [value] = useLocalStorage("accent", "");

  React.useEffect(() => {
    const html = document.querySelector("html") as HTMLHtmlElement;

    html.classList.add(value);

    console.log("dsadsa");

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
