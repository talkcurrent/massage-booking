import localFont from "next/font/local";
import "./globals.css";
import CommonProvider from "./components/context/CommonContext";
import { Suspense } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "TheraBonnies (private massage therapists)",
  description: "Private massage therapists",
  icons: {
    icon: '/therabonnie.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Suspense fallback={<>Loading...</>}>
          <CommonProvider>
            {children}
          </CommonProvider>
        </Suspense>
      </body>
    </html>
  );
}
