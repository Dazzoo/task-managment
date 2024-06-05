import type { Metadata } from "next";
import { Signika_Negative } from "next/font/google";
import "./globals.css";

const defaultFont = Signika_Negative({ subsets: ["latin"], weight: '400'  })

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={defaultFont.className}>{children}</body>
    </html>
  );
}
