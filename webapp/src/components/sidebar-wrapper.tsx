"use client";

import { LuLayoutDashboard } from "react-icons/lu";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LoginButton, LogoutButton } from "@/features/auth/components";
import { useCurrentUser } from "@/features/auth/hooks";
import { retainClasses } from "@/lib/utils";
import { MenuAdminItem, MenuItem, MenuToolsItem } from "@/types";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import { PiSignOutBold } from "react-icons/pi";
import { RiProfileLine } from "react-icons/ri";
import { useLocalStorage } from "usehooks-ts";
import { CustomAvatar } from "./custom-avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface Props {
  menuItems: MenuItem[];
  menuToolsItems?: MenuToolsItem[];
  menuAdminItems?: MenuAdminItem[];
}

export function SidebarWrapper({
  menuItems,
  menuToolsItems,
  menuAdminItems,
}: Props) {
  const pathname = usePathname();
  const user = useCurrentUser();

  const { setTheme, theme } = useTheme();
  const [theTheme, setTheTheme] = useState(theme);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [value, setValue, removeValue] = useLocalStorage("accent", "");

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
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <LuLayoutDashboard />{" "}
                  <span className="line-clamp-1">Designs and LPs Hub</span>
                  <ChevronDown className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem>
                  <span>Acme Inc</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Acme Corp.</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                Application
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname.startsWith(item.url)}
                        tooltip={item.title}
                      >
                        <Link href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        {menuToolsItems && (
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger>
                  Tools
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {menuToolsItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          isActive={pathname.startsWith(item.url)}
                          tooltip={item.title}
                        >
                          <Link href={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        )}

        {menuAdminItems && (
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger>
                  Admin tools
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {menuAdminItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          isActive={pathname.startsWith(item.url)}
                          tooltip={item.title}
                        >
                          <Link href={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        )}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="h-auto">
                  <CustomAvatar image={user?.image} className="size-6" />
                  <span className="line-clamp-1">{user?.name || "User"}</span>
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuLabel>Theme</DropdownMenuLabel>
                <DropdownMenuRadioGroup
                  defaultValue={theme}
                  value={theTheme}
                  onValueChange={setTheTheme}
                >
                  <DropdownMenuRadioItem
                    value="light"
                    className="cursor-pointer"
                    onClick={() => setTheme("light")}
                  >
                    Light
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    value="dark"
                    className="cursor-pointer"
                    onClick={() => setTheme("dark")}
                  >
                    Dark
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    value="system"
                    className="cursor-pointer"
                    onClick={() => setTheme("system")}
                  >
                    System
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Accent</DropdownMenuLabel>
                <div className="flex flex-wrap items-center justify-start gap-1">
                  {accents.map((accent) => (
                    <DropdownMenuItem
                      key={accent.name}
                      onClick={() => {
                        const html = document.querySelector(
                          "html",
                        ) as HTMLHtmlElement;

                        retainClasses(html, ["light", "dark"]);

                        const accentClass = `accent-theme-${accent.id}`;

                        html.classList.add(accentClass);
                        setValue(accentClass);
                      }}
                    >
                      <span className="sr-only">{accent.name}</span>
                      <span
                        className="size-5 rounded-sm"
                        style={{
                          backgroundColor: `hsl(var(--accent-${accent.id}))`,
                        }}
                      ></span>
                    </DropdownMenuItem>
                  ))}
                </div>
                <DropdownMenuSeparator />

                {user ? (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href={"/profile"}>
                        <RiProfileLine />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={"/settings"}>
                        <HiOutlineCog6Tooth />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <div>
                        <LogoutButton>
                          <span className="flex items-center justify-start gap-2">
                            <PiSignOutBold />
                            Sign out
                          </span>
                        </LogoutButton>
                      </div>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <div>
                        <LoginButton>
                          <span className="flex items-center justify-start gap-2">
                            <PiSignOutBold />
                            Login
                          </span>
                        </LoginButton>
                      </div>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
