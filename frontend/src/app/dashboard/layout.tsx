import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Healthcare Dashboard - Analytics Platform",
  description: "Healthcare performance analytics and data visualization dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-layout">
      {children}
    </div>
  );
}