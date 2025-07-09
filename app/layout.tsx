import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "sonner";
import StateProvider from "@/context/GlobalState";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Innorik Task",
  description: "A bookstore web app with NextJS,.NET CORE and SQL SERVER",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body
      >
        <StateProvider>
          {children}
        </StateProvider>
        <Toaster/>
      </body>
    </html>
  );
}
