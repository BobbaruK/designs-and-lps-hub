"use client";

import { ReactNode } from "react";
import { logout } from "../actions/logout";
import { revalidate } from "@/actions/reavalidate";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
  children?: ReactNode;
}

export const LogoutButton = ({ children }: Props) => {
  const router = useRouter();

  const signOut = async () => {
    logout().then((data) => {
      if (data.error) {
        toast.error(data.error);
      }

      if (data.success) {
        toast.success(data.success);
        router.push("/auth/login");
      }

      revalidate();
    });
  };

  return (
    <span onClick={signOut} className="w-full cursor-pointer">
      {children}
    </span>
  );
};
