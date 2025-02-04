import type { Metadata } from "next";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import {notFound} from 'next/navigation';
import StoreProvider from '@/app/StoreProvider';
import localFont from "next/font/local";
import Navbar from "@/app/ui/common/navbar";
import Script from 'next/script';
import "bootstrap/dist/css/bootstrap.min.css";
import "../globals.css";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
  params: {locale}
}: Readonly<{
  children: React.ReactNode;
  params: {locale: string };
}>) {
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  const resolvedLocale = await locale;

  return (
    <html lang={resolvedLocale}>
      <body>
        <StoreProvider>
          <NextIntlClientProvider messages={messages}>
            <Navbar></Navbar>
            <div className="container">
              {children}
            </div>
          </NextIntlClientProvider>
        </StoreProvider>

        <Script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
            strategy="beforeInteractive"
          />
      </body>
    </html>
  );
}
