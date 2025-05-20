"use client";

import { CustomAvatar } from "@/components/custom-avatar";
import { SelectCell } from "@/components/data-table-server-rendered/select/cell";
import { SelectHeader } from "@/components/data-table-server-rendered/select/header";
import { THeadDropdown } from "@/components/data-table-server-rendered/thead-dropdown";
import { IconCheck } from "@/components/icons/check";
import { IconClose } from "@/components/icons/close";
import { dateFormatter } from "@/lib/format-date";
import { capitalizeFirstLetter, columnId } from "@/lib/utils";
import { DB_User } from "@/types/db/users";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { TransitionStartFunction } from "react";
import AdminUsersRowActions from "./admin-users-row-actions";

export const columns = ({
  isLoading,
  startTransition,
  visibleUsers,
}: {
  isLoading: boolean;
  startTransition: TransitionStartFunction;
  visibleUsers: DB_User[];
}): ColumnDef<DB_User>[] => [
  // Name
  {
    ...columnId({ id: "name" }),
    accessorFn: (originalRow) => originalRow.name.toLowerCase(),
    enableHiding: false,
    header: () => {
      return (
        <THeadDropdown
          id="name"
          label={"Name"}
          isLoading={isLoading}
          startTransition={startTransition}
        />
      );
    },
    cell: ({ row }) => {
      const id = row.original.id;
      const name = row.original.name || "-";
      const image = row.original.image;

      return (
        <div className="p-2">
          <Link
            href={`/profile/${id}`}
            className={
              "flex h-auto w-fit flex-row items-center justify-start gap-2"
            }
          >
            <CustomAvatar image={image} />
            {name}
          </Link>
        </div>
      );
    },
  },
  // Email
  {
    ...columnId({ id: "email" }),
    accessorFn: (originalRow) => originalRow.email,
    enableHiding: false,
    header: () => {
      return (
        <THeadDropdown
          id="email"
          label={"Email"}
          isLoading={isLoading}
          startTransition={startTransition}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="p-2">
          <Link
            href={`mailto:${row.original.email}`}
            className="flex items-center gap-2"
          >
            {row.original.email}
          </Link>
        </div>
      );
    },
  },
  // Email verified at
  {
    ...columnId({ id: "emailVerified" }),
    accessorFn: (originalRow) => originalRow.emailVerified || undefined,
    sortDescFirst: false,
    sortingFn: "datetime",
    sortUndefined: "last",
    header: () => {
      return (
        <THeadDropdown
          id="emailVerified"
          label={"Email verified At"}
          isLoading={isLoading}
          startTransition={startTransition}
        />
      );
    },
    cell: ({ getValue }) => {
      const date = getValue() as Date | null;
      return <div className="p-2">{date ? dateFormatter({ date }) : "-"}</div>;
    },
  },
  // Role
  {
    ...columnId({ id: "role" }),
    accessorFn: (originalRow) => originalRow.role.toLowerCase(),
    enableHiding: false,
    header: () => {
      // TODO: make known issue: prisma sort enums by index:not(name)
      return (
        <THeadDropdown
          id="role"
          label={"Role"}
          isLoading={isLoading}
          startTransition={startTransition}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="p-2">{capitalizeFirstLetter(row.original.role)}</div>
      );
    },
  },
  // 2FA
  {
    ...columnId({ id: "2fa" }),
    accessorFn: (originalRow) => originalRow.isTwoFactorEnabled,
    sortDescFirst: false,
    header: () => {
      return (
        <THeadDropdown
          id="2fa"
          label={"2FA"}
          isLoading={isLoading}
          startTransition={startTransition}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="p-2">
          {row.original.isTwoFactorEnabled ? (
            <span className="[&_svg]:size-6">
              <IconCheck isSuccess />
            </span>
          ) : (
            <span className="[&_svg]:size-8">
              <IconClose isSuccess={false} />
            </span>
          )}
        </div>
      );
    },
  },
  // Is Oauth
  {
    ...columnId({ id: "isOauth" }),
    accessorFn: (originalRow) => originalRow.accounts.length,
    sortDescFirst: false,
    header: () => "Is Oauth",
    cell: ({ row }) => {
      return (
        <div className="p-2">
          {row.original.accounts.length ? (
            <span className="[&_svg]:size-6">
              <IconCheck isSuccess />
            </span>
          ) : (
            <span className="[&_svg]:size-8">
              <IconClose isSuccess={false} />
            </span>
          )}
        </div>
      );
    },
  },
  // Created At
  {
    ...columnId({ id: "createdAt" }),
    accessorFn: (originalRow) => originalRow.createdAt,
    sortingFn: "datetime",
    sortDescFirst: false,
    header: () => {
      return (
        <THeadDropdown
          id="createdAt"
          label={"Created At"}
          isLoading={isLoading}
          startTransition={startTransition}
        />
      );
    },
    cell: ({ getValue }) => {
      const date = getValue() as Date | null;
      return <div className="p-2">{date ? dateFormatter({ date }) : "-"}</div>;
    },
  },
  // Updated At
  {
    ...columnId({ id: "updatedAt" }),
    sortingFn: "datetime",
    sortDescFirst: false,
    accessorFn: (originalRow) => originalRow.updatedAt,
    header: () => {
      return (
        <THeadDropdown
          id="updatedAt"
          label={"Updated At"}
          isLoading={isLoading}
          startTransition={startTransition}
        />
      );
    },
    cell: ({ getValue }) => {
      const date = getValue() as Date | null;
      return <div className="p-2">{date ? dateFormatter({ date }) : "-"}</div>;
    },
  },
  // Select
  {
    ...columnId({ id: "select" }),
    enableHiding: false,
    header: () => {
      return (
        <SelectHeader
          data={visibleUsers}
          isLoading={isLoading}
          startTransition={startTransition}
        />
      );
    },
    cell: ({ row }) => {
      const id = row.original.id;

      return (
        <SelectCell
          id={id}
          isLoading={isLoading}
          startTransition={startTransition}
        />
      );
    },
  },
  // Actions
  {
    ...columnId({ id: "actions" }),
    enableHiding: false,
    header: () => {
      return "Actions";
    },
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="flex items-center justify-start">
          <AdminUsersRowActions user={user} />
        </div>
      );
    },
  },
];
