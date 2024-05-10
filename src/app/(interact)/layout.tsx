import type { Metadata } from "next";
import { Inter,Libre_Franklin,IBM_Plex_Mono } from "next/font/google";
import "../globals.css";
import App from "@/app/App";
import Sidebar from "./Sidebar";

const libre_Franklin = Libre_Franklin({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "KNOWTIFAI",
  description: "Discover a smarter way to learn with KnowtifAI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={libre_Franklin.className}>
        <App>
          <div className="flex items-center">
            <Sidebar />
            {children}
          </div>
        </App>
      </body>
    </html>
  );
}
