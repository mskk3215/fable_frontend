import "./global.css";
import AppProvider from "./provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
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
