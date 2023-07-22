import React from "react";
import { Header } from "../atoms/layout/Header";

type Props = {
  children: React.ReactNode;
};

export const HeaderOnly = (props: Props) => {
  const { children } = props;
  return (
    <>
      <Header />
      {children}
    </>
  );
};
