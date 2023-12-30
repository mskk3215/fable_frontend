import "./global.css";
import { Metadata } from "next";
import StyledComponentsRegistry from "./_lib/registry";
import RecoilProvider from "./provider";
import { MessageToast } from "./_components/MessageToast";
import { Header } from "./_components/headerfotter/Header";

export const metadata: Metadata = {
  title: {
    template: "%s - fabre insect search",
    default: "fabre",
  },
  description: "fabre insect search",
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
