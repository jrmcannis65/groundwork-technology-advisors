import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title:
    "Groundwork Technology Advisors | Building the Technology Foundation That Lets You Scale",
  description:
    "Groundwork Technology Advisors helps small and mid-size companies understand their technology environment, strengthen their engineering practices, and build a clear path forward. Founded by a senior healthcare technology executive with 30 years of experience.",
  metadataBase: new URL("https://groundworktechnologyadvisors.com"),
  icons: {
    icon: [{ url: "/gta_logo_mark.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    siteName: "Groundwork Technology Advisors",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
