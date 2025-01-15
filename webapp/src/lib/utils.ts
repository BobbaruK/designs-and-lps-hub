import { FormatDateOptions } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

export const columnId = ({ id }: { id: string }) => {
  return {
    id,
    accessorKey: id,
  };
};

export function formatDate(
  date: string | Date,
  options: FormatDateOptions = {},
): string {
  // Convertim string-ul într-un obiect Date dacă este necesar
  const parsedDate = typeof date === "string" ? new Date(date) : date;

  // Verificăm dacă `parsedDate` este valid
  if (isNaN(parsedDate.getTime())) {
    throw new Error("Invalid date format.");
  }

  // Extragem opțiunile
  const {
    locale = "en-US", // Limba implicită
    timeZone = "UTC", // Fusul orar implicit
    ...intlOptions
  } = options;

  // Formatarea folosind `Intl.DateTimeFormat`
  return new Intl.DateTimeFormat(locale, { timeZone, ...intlOptions }).format(
    parsedDate,
  );
}

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
