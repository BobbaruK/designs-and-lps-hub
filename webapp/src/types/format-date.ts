export type FormatDateOptions = {
  locale?: string; // Limba utilizată pentru localizare, ex. 'es', 'ro'
  timeZone?: string; // Fusul orar, ex. 'UTC', 'Europe/Bucharest'
  year?: "numeric" | "2-digit";
  month?: "numeric" | "2-digit" | "long" | "short" | "narrow";
  day?: "numeric" | "2-digit";
  hour?: "numeric" | "2-digit";
  minute?: "numeric" | "2-digit";
  second?: "numeric" | "2-digit";
  timeZoneName?: "short" | "long";
};
