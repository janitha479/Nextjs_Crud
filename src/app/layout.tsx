import type { Metadata } from "next";
import "./globals.css";

export const metadata = {
  title: "Student Management System",
  description: "Manage and track student information",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}
