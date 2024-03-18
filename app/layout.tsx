import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import { MuiLocalizationProvider } from "@/providers/MuiLocalizationProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Caliop - Travel Viewer",
    description: "Caliop - Travel Viewer by Javier Villegas",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AppRouterCacheProvider>
                    <ReactQueryProvider>
                        <MuiLocalizationProvider>
                            <main className="my-8 mx-12">
                                <div className="mx-auto max-w-screen-2xl">
                                    {children}
                                </div>
                            </main>
                        </MuiLocalizationProvider>
                    </ReactQueryProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
