import React from "react";
import { Footer } from "../atoms/layout/Footer";
import { Header } from "../atoms/layout/Header";

type Props = {
  children: React.ReactNode;
};

export const DefaultLayout = (props: Props) => {
  const { children } = props;
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
