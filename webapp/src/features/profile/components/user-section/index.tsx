import { Prisma } from "@prisma/client";
import React from "react";
import { UserDataSection } from "./user-data-section";
import { UserLandingPagesStats } from "./user-landing-pages-stats";
import { UserRequestedLandingPages } from "./user-requested-landing-pages";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  user: Prisma.UserGetPayload<{
    omit: {
      password: true;
    };
    include: {
      _count: {
        select: {
          landingPageCreated: true;
          landingPageUpdated: true;
        };
      };
      landingPagesRequested: {
        orderBy: {
          createdAt: "desc";
        };
        select: {
          id: true;
          name: true;
          slug: true;
          license: {
            select: {
              id: true;
              name: true;
              slug: true;
            };
          };
          language: {
            select: {
              id: true;
              englishName: true;
              iso_639_1: true;
              flag: true;
            };
          };
          design: {
            select: {
              avatar: true;
            };
          };
        };
        take: 5;
      };
    };
  }>;
  lpCount: number;
}

export const UserSection = async ({ user, lpCount }: Props) => {
  return (
    <div className="@container/us">
      <div className="grid grid-cols-1 gap-4 @3xl/us:grid-cols-2">
        <UserDataSection user={user} className="col-span-full" />
        <UserRequestedLandingPages user={user} />
        <UserLandingPagesStats user={user} landingPageCount={lpCount || 0} />
      </div>
    </div>
  );
};
