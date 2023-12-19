"use client";
import { Statistics } from "../../_components/statistics/Statistics";
import RouteAuthGuard from "../../_components/auth/RouteAuthGurad";

export default function StatisticsPage() {
  return (
    <>
      <RouteAuthGuard>
        <Statistics />
      </RouteAuthGuard>
    </>
  );
}
