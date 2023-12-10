"use client";

import { ReactNode } from "react";
import { RecoilRoot } from "recoil";
import { MessageToast } from "./_components/MessageToast";

export default function AppProvider({ children }: { children: ReactNode }) {
  return (
    <RecoilRoot>
      {children}
      <MessageToast />
    </RecoilRoot>
  );
}
