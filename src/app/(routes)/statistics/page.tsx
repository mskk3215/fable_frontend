import { Metadata } from "next";
import { Statistics } from "../../_components/statistics/Statistics";
import RouteAuthGuard from "../../_components/auth/RouteAuthGurad";

export const metadata: Metadata = {
  title: "分析",
  description: "分析ページ",
};

export default function StatisticsPage() {
  return (
    <>
      <RouteAuthGuard>
        <Statistics />
      </RouteAuthGuard>
    </>
  );
}
