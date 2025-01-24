import { CustomAvatar } from "@/components/custom-avatar";
import { FORMAT_DATE_OPTIONS } from "@/constants/date";
import { cn, formatDate } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import Link from "next/link";

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
}

export const UserDataSection = ({ user, ...restProps }: Props) => {
  return (
    <div className={cn("@container/uds", restProps.className)}>
      <div className="flex flex-col gap-4 @2xl/uds:flex-row">
        <CustomAvatar
          image={user.image}
          className="size-40 self-center sm:self-auto"
        />
        <div className="flex flex-col items-center gap-4 text-center sm:block sm:space-y-4 sm:text-start">
          <p>
            On this site since:{" "}
            <strong>{formatDate(user.createdAt, FORMAT_DATE_OPTIONS)}</strong>
          </p>
          <p>
            Email:{" "}
            <Link href={`mailto:${user.email}`}>
              <strong>{user.email}</strong>
            </Link>
          </p>
          <p className="w-full">
            <span className="text-sm italic">
              This user have not updated their bio yet.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
