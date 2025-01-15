"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";
import { useLocalStorage } from "usehooks-ts";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [value] = useLocalStorage("accent", "");

  React.useEffect(() => {
    const html = document.querySelector("html") as HTMLHtmlElement;

    html.classList.add(value);

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
