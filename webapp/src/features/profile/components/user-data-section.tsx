import { CustomAvatar } from "@/components/custom-avatar";
import { FORMAT_DATE_OPTIONS } from "@/constants";
import { formatDate } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import Link from "next/link";

interface Props {
  user: Prisma.UserGetPayload<{
    omit: {
      password: true;
    };
  }>;
}

export const UserDataSection = ({ user }: Props) => {
  return (
    <div className="flex flex-col items-center gap-4 text-center sm:block sm:space-y-4 sm:text-start">
      <CustomAvatar
        image={user.image}
        className="mb-2 me-4 size-40 sm:float-start lg:me-8"
      />
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
  );
};
