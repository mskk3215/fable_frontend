import "./global.css";
import AppProvider from "./provider";

export const metadata = {
  title: "fabre insect search",
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
        <div>
          <AppProvider>
            <main>{children}</main>
          </AppProvider>
        </div>
      </body>
    </html>
  );
}
