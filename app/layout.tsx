import Navbar from "@/components/navbar";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-commerce Store",
  description: "A simple e-commerce store built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <>
            <header>
              <Navbar />
            </header>
            {children}
            <footer className="border-t border-dashed py-6">
              <div className="container mx-auto text-sm text-muted-foreground text-center">
                &copy; {new Date().getFullYear()} All rights reserved.
              </div>
            </footer>
          </>
        </ThemeProvider>
      </body>
    </html>
  );
}
