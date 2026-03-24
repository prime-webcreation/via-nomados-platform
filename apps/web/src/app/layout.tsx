import type { Metadata } from "next";

import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";

export const metadata: Metadata = {
  title: "VIA NomadOS OTA",
  description: "Microservices-ready OTA boilerplate",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
            <div className="container-page flex h-16 items-center justify-between">
              <h1 className="text-lg font-semibold text-slate-900">
                VIA NomadOS OTA
              </h1>
              <p className="text-sm text-slate-500">
                Next.js + NestJS + Prisma
              </p>
            </div>
          </header>
          <main className="py-8">{children}</main>
        </QueryProvider>
      </body>
    </html>
  );
}
