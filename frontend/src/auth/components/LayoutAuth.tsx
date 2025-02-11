import React from "react";

interface Props {
  children: React.ReactNode;
}
const LayoutAuth = ({ children }: Props) => {
  return (
    <main className="flex w-full bg-slate-50 h-dvh justify-center items-center gap-4">
      {children}
    </main>
  );
};

export default LayoutAuth;
