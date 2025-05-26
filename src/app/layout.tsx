import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SessionProvider from "@/components/SessionProvider";
import { ThemeProvider } from "next-themes";
import ToasterProvider from "@/components/ToasterProvider";
import "./globals.css";
import CornerActions from "@/components/CornerActions";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Personal portfolio page created with NextJS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden overflow-y-auto`}
      >
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ToasterProvider />
            <CornerActions />
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
