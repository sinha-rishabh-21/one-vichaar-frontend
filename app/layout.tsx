import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ProgressBar from "@/components/ProgressBar";
import { Toaster } from "@/components/ui/sonner";
//import { Ephesis } from "next/font/google";

//const ephesis = Ephesis({ subsets: ["latin"], weight: ["400"] });

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "One Vichaar - Home",
  description: "One Vichaar - Home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased flex flex-col h-screen`}
      >
        <Navbar />
        <main className="flex-grow">
          <ProgressBar />
          {children}
          <Toaster
            richColors
            position="bottom-right"
            offset={50} // Moves it 50px from the bottom
            className="!right-5" // Moves it 20px from the right
          />
        </main>
        <Footer />
      </body>
    </html>
  );
}
