import "./global.css";
import { Metadata } from "next";
import StyledComponentsRegistry from "./_lib/registry";
import RecoilProvider from "./provider";
import { MessageToast } from "./_components/MessageToast";
import { Header } from "./_components/headerfotter/Header";

const siteName = "fabre search";
const description = "このサイトは昆虫採集をする人向けのアプリです。";
const url = "https://fablesearch.com";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    template: "%s - fabre search",
    default: siteName,
  },
  description,
  openGraph: {
    title: siteName,
    description,
    url,
    siteName,
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    title: siteName,
    description,
    card: "summary_large_image",
  },
  alternates: {
    canonical: url,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="icon" type="image/x-icon" href="/icon.ico" />
      </head>
      <body>
        <StyledComponentsRegistry>
          <RecoilProvider>
            <Header />
            <main>{children}</main>
            <MessageToast />
          </RecoilProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
