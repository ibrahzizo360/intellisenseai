import type { Metadata } from "next";
import { Inter,Libre_Franklin,IBM_Plex_Mono } from "next/font/google";
import "../globals.css";
import App from "../App";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

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
          <Nav />  
          {children}
          <Footer />
        </App>
      </body>
    </html>
  );
}
