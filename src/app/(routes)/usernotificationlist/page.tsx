import React from "react";
import { Metadata } from "next";
import RouteAuthGuard from "../../_components/auth/RouteAuthGurad";
import { UserNotificationList } from "../../_components/usernotificationlist/UserNotificationList";

export const metadata: Metadata = {
  title: "通知一覧",
  description: "通知一覧ページ",
};

export default function UserNotificationListPage() {
  return (
    <main>
      <RouteAuthGuard>
        <UserNotificationList />
      </RouteAuthGuard>
    </main>
  );
}
