import { DB_Design } from "@/types/db/design";
import { DB_LandingPage } from "@/types/db/landing-pages";
import { useMemo } from "react";

type ChartDataEntry = {
  date: string;
  designs: number;
  lps: number;
};

function formatDate(date: Date | string): string {
  return new Date(date).toISOString().slice(0, 10);
}

function getLastNDates(n: number): string[] {
  const dates: string[] = [];
  const today = new Date();

  for (let i = 0; i < n; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - (n - 1 - i));
    dates.push(formatDate(d));
  }

  return dates;
}

export function useLPsDesignsChartData(
  landingPages: DB_LandingPage[] | null,
  designs: DB_Design[] | null,
  numberOfDays = 90,
): ChartDataEntry[] {
  return useMemo(() => {
    const dateCountMap: Record<string, { designs: number; lps: number }> = {};

    designs?.forEach((design) => {
      const date = formatDate(design.createdAt);
      if (!dateCountMap[date]) dateCountMap[date] = { designs: 0, lps: 0 };
      dateCountMap[date].designs += 1;
    });

    landingPages?.forEach((lp) => {
      const date = formatDate(lp.createdAt);
      if (!dateCountMap[date]) dateCountMap[date] = { designs: 0, lps: 0 };
      dateCountMap[date].lps += 1;
    });

    const dates = getLastNDates(numberOfDays);

    return dates.map((date) => {
      const counts = dateCountMap[date] || { designs: 0, lps: 0 };
      return {
        date,
        designs: counts.designs,
        lps: counts.lps,
      };
    });
  }, [landingPages, designs, numberOfDays]);
}
