import { Metadata } from "next";
import RouteAuthGuard from "../../_components/auth/RouteAuthGurad";
import { PictureBookList } from "../../_components/picturebooklist/PictureBookList";

export const metadata: Metadata = {
  title: "図鑑リスト",
  description: "図鑑リストページ",
};

export default function StatisticsPage() {
  return (
    <>
      <RouteAuthGuard>
        <PictureBookList />
      </RouteAuthGuard>
    </>
  );
}
