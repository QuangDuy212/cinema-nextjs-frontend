import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './globals.css';
import StoreProvider from "./StoreProvider";
import AccountProvider from "./AccountProvider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cinema",
  description: "Generated by Duy Nguyen",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <AccountProvider>
            {children}
          </AccountProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
