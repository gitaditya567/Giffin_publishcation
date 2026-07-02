import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "../context/AppContext";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatWidgets from "../components/FloatWidgets";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Griffin Publication | Elevate Your Academic & Research Publications",
  description: "Griffin Publication supports authors, researchers, and institutions with ethical, transparent, and timely academic publishing solutions.",
  keywords: "academic publishing, research journals, publish book, publish book chapter, academic books, book store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${inter.variable}`}>
        <AppProvider>
          <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Header />
            <Navbar />
            <main style={{ flex: 1 }}>
              {children}
            </main>
            <FloatWidgets />
            <Footer />
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
