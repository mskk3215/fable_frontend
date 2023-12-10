import React from "react";
import { Footer } from "./_components/headerfotter/Footer";
import { Header } from "./_components/headerfotter/Header";

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
