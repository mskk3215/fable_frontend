import Top from "./_components/top/Top";
import { Footer } from "./_components/headerfotter/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "トップ - fabre search",
  description: "昆虫採集をする人向けのアプリ:fabre insect searchのトップページ",
};

export default function TopPage() {
  return (
    <>
      <Top />
      <Footer />
    </>
  );
}
