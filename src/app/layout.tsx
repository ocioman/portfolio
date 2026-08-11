import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Lorenzo Andreotta - Software Developer",
  description: "Personal portfolio of Lorenzo Andreotta, a Software Developer specializing in C, C++, Java, and modern web technologies.",
  icons: {
    icon: "/assets/l_a.svg",
  },
};

//root
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
