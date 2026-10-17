import type { Metadata } from "next";
import Dashboard from "./Dashboard";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your Dockase developer dashboard — API key, usage, and plan.",
};

export default function DashboardPage() {
  return <Dashboard />;
}
