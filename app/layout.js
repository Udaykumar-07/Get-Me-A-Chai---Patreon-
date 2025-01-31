import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from '@/components/SessionWrapper'
import connectDB from '@/database/connectDB'


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
  title: "Get Me A Chai",
  description: "Chai for developers",
};

export default async function RootLayout({ children }) {
  await connectDB()
  return (
    <html lang="en">
      <head>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=account_circle" />
      </head>
      <body
        className=" bg-slate-950 bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"
      >
        <SessionWrapper>
        <Navbar/>
        <div className="min-h-screen w-full bg-slate-950 bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))] text-white">
        {children}
        </div>
        <Footer/>
        </SessionWrapper>
      </body>
    </html>
  );
}
