import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; // pastikan path ini sesuai dengan strukturmu

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Data Sheet Visualize",
  description: "Visualize Your Sheet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakarta.variable} antialiased bg-gray-50 flex flex-col min-h-screen`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
