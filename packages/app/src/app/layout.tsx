import "@rainbow-me/rainbowkit/styles.css";
import "./globals.css";

import { Inter } from "next/font/google";

import { CredentialsProvider } from "@/providers/CredentialsProvider";
import { QueryProvider } from "@/providers/QueryProvider";
import { SigningKeyProvider } from "@/providers/SigningKeyProvider";
import { WalletProvider } from "@/providers/WalletProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "IdP3",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <WalletProvider>
            <SigningKeyProvider>
              <CredentialsProvider>{children}</CredentialsProvider>
            </SigningKeyProvider>
          </WalletProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
