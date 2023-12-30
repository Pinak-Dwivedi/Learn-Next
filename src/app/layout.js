import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import ReduxProvider from "@/components/ReduxProvider";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import ThemeProvider from "@/components/ThemeProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LEARN-NEXT",
  description:
    "This is LEARN-NEXT, an application made with Next.js for implementing Next.js concepts into a project.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} flex flex-col justify-between gap-4 bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-slate-100`}
      >
        <ReduxProvider>
          <ReactQueryProvider>
            <ThemeProvider>
              <Header />
              {children}
              <Footer />
            </ThemeProvider>
          </ReactQueryProvider>
        </ReduxProvider>

        <Toaster
          toastOptions={{
            style: {
              backgroundColor: "#3a3847",
              color: "#faf8ff",
            },
          }}
        />
      </body>
    </html>
  );
}
