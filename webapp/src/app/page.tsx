import { CustomButton } from "@/components/custom-button";
import { LoginButton } from "@/features/auth/components/login-button";
import { currentUser } from "@/features/auth/lib/auth";

export default async function Home() {
  const user = await currentUser();

  return (
    <div className="container flex min-h-dvh flex-col items-center justify-center">
      <div className="space-y-6 text-center">
        <h1 className="flex items-center gap-4 text-6xl font-semibold text-foreground drop-shadow-md">
          👋 Welcome to Design and LPs Hub
        </h1>
        {!user ? (
          <div>
            <LoginButton mode="modal" asChild>
              <CustomButton
                buttonLabel={`Sign in`}
                variant={"secondary"}
                size={"lg"}
              />
            </LoginButton>
          </div>
        ) : (
          <CustomButton
            buttonLabel={`Go to dashboard`}
            variant={"secondary"}
            size={"lg"}
            linkHref="/dashboard"
          />
        )}
      </div>
    </div>
  );
}
