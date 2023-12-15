"use client";

import { useAuthCheck } from "../../../hooks/user/useAuthCheck";
import { Statistics } from "../../_components/statistics/Statistics";

export default function StatisticsPage() {
  useAuthCheck();
  return (
    <>
      <Statistics />
    </>
  );
}
