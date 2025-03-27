import { GoogleTagManager } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer";
import ClientOnly from "./components/helper/client-only";
import Navbar from "./components/navbar";
import "./css/card.scss";
import "./css/globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "About Ethan Solnik",
  description:
    "This is the portfolio of Ethan Solnik. I am a Mathematics and Engineering Student at Queen's University",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientOnly fallback={<div className="min-h-screen"></div>}>
          <ToastContainer />
        </ClientOnly>
        <main className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white">
          <Navbar />
          {children}
          <ClientOnly>
            {/* Import ScrollToTop only on client-side */}
            <div suppressHydrationWarning>
              {typeof window !== 'undefined' && (() => {
                const ScrollToTop = require('./components/helper/scroll-to-top').default;
                return <ScrollToTop />;
              })()}
            </div>
          </ClientOnly>
        </main>
        <Footer />
        {process.env.NEXT_PUBLIC_GTM && (
          <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />
        )}
      </body>
    </html>
  );
}
