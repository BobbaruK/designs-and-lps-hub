import { ACTION_MESSAGES, PRISMA_MESSAGES } from "@/constants/messages";
import { Prisma } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const columnId = ({ id }: { id: string }) => {
  return {
    id,
    accessorKey: id,
  };
};

// TODO: break this functions into its own files

export const passwordRefine = (password: string, ctx: z.RefinementCtx) => {
  const containsUppercase = (ch: string) => /[A-Z]/.test(ch);
  const containsLowercase = (ch: string) => /[a-z]/.test(ch);
  const containsSpecialChar = (ch: string) =>
    /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);

  let countOfUpperCase = 0,
    countOfLowerCase = 0,
    countOfNumbers = 0,
    countOfSpecialChar = 0;

  for (let i = 0; i < password.length; i++) {
    const ch = password.charAt(i);

    if (!isNaN(+ch)) countOfNumbers++;
    else if (containsUppercase(ch)) countOfUpperCase++;
    else if (containsLowercase(ch)) countOfLowerCase++;
    else if (containsSpecialChar(ch)) countOfSpecialChar++;
  }

  if (
    countOfLowerCase < 1 ||
    countOfUpperCase < 1 ||
    countOfSpecialChar < 1 ||
    countOfNumbers < 1
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Password does not meet complexity requirements",
    });
  }
};

export function retainClasses(
  element: HTMLHtmlElement,
  classesToKeep: string[],
): void {
  // Get all current classes of the element
  const currentClasses = Array.from(element.classList);

  // Loop through all the current classes
  currentClasses.forEach((className) => {
    // If the current class is not in the list of classes to keep, remove it
    if (!classesToKeep.includes(className)) {
      element.classList.remove(className);
    }
  });
}

export const prismaError = (
  err: Prisma.PrismaClientKnownRequestError,
  resource?: string,
) => {
  switch (err.code) {
    case "P2002":
      return { error: PRISMA_MESSAGES(resource).P2002 };

    default:
      return { error: ACTION_MESSAGES().COULD_NOT_ADD };
  }
};
