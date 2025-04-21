// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["600"],
  });


export const metadata: Metadata = {
  title: "Zapreach",
  description: "Dead simple cold outreach that just works",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
       <body className={`bg-gray-50 ${poppins.className}`}>{children}</body>

    </html>
  );
}
