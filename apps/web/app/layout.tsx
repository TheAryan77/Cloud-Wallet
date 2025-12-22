import type { Metadata } from "next";
import { Delius } from "next/font/google";
import "./globals.css";

const delius = Delius({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-delius",
});

export const metadata: Metadata = {
  title: "Cloud Wallet - Your Digital Life Organized",
  description: "Manage your courses, track your calendar, and keep your digital wallet all in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={delius.className}>
        {children}
      </body>
    </html>
  );
}
