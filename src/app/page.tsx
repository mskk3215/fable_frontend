import Top from "./_components/top/Top";
import { Footer } from "./_components/headerfotter/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "トップ - fablesearch",
  description:
    "昆虫採集をする人向けのアプリ:fablesearch insect searchのトップページ",
};

export default function TopPage() {
  return (
    <>
      <Top />
      <Footer />
    </>
  );
}
