"use client";

import { CustomButton } from "@/components/custom-button";
import { DEFAULT_LOGIN_REDIRECT } from "@/constants";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export const Social = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex w-full items-center gap-x-2">
      <CustomButton
        buttonLabel={``}
        variant={"outline"}
        icon={FcGoogle}
        iconPlacement="left"
        className="w-full"
        size={"lg"}
        onClick={() => onClick("google")}
      />
      <CustomButton
        buttonLabel={``}
        variant={"outline"}
        icon={FaGithub}
        iconPlacement="left"
        className="w-full"
        size={"lg"}
        onClick={() => onClick("github")}
      />
    </div>
  );
};
