import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";

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
    images: ["/assets/brand/gta_og_image.svg"],
  },
  twitter: {
    card: "summary_large_image",
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-MKLVJ4Q3CP"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MKLVJ4Q3CP');
          `}
        </Script>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
