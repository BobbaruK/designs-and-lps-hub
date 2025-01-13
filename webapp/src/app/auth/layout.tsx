import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return <main className="h-dvh">{children}</main>;
};

export default AuthLayout;
