import type { Metadata } from "next";
import "./globals.scss";
import { ThemeProvider } from "@/lib/theme-provider";
import { Providers } from "@/lib/providers";
import Loading from "@/components/shared/topLoader/top-loader";

export const metadata: Metadata = {
  title: {
    template: "%s - VeriDoc CRM",
    default: "VeriDoc CRM",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Providers>
            {children}
            <Loading />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
