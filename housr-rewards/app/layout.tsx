// app/layout.tsx
import "./globals.css";
import Link from "next/link";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "My Web App",
  description: "A simple 3-page site built with Next.js App Router",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Example: Google Font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-gray-50 text-gray-900">
          <Link href="/">Home</Link>  
          <header /* shadow*/ className="p-4 bg-white flex gap-6 justify-center">
            
            <nav
            className="
              flex items-center justify-center gap-20
              bg-white/80 backdrop-blur-md
              rounded-full shadow-md
              py-3 px-6 pr-5 pl-5
              border border-gray-100
            "
            >
              
              <Link
                href="/dashboard"
                className="relative inline-flex items-center justify-center
                  px-6 py-3 overflow-hidden font-medium text-white rounded-full
                  transition-all duration-300 ease-out
                  bg-[linear-gradient(180deg,#22704d,#1f9c5b,#b1e3c5)]
                  bg-[length:200%_200%]
                  animate-gradient
                  hover:scale-105
                  focus:outline-none"
              >
                Dashboard
              </Link>

              

              <Link
                // className="px-6 py-3 rounded-full bg-green-600 text-white font-medium hover:bg-green-700 transition"
                href="/payments"
                className="relative inline-flex items-center justify-center
                  px-6 py-3 overflow-hidden font-medium text-white rounded-full
                  transition-all duration-300 ease-out
                  bg-[linear-gradient(180deg,#22704d,#1f9c5b,#b1e3c5)]
                  bg-[length:200%_200%]
                  animate-gradient
                  hover:scale-105
                  focus:outline-none"
              >
                Payments
              </Link>

              <Link
                href="/rewards"
                className="relative inline-flex items-center justify-center
                  px-6 py-3 overflow-hidden font-medium text-white rounded-full
                  transition-all duration-300 ease-out
                  bg-[linear-gradient(180deg,#22704d,#1f9c5b,#b1e3c5)]
                  bg-[length:200%_200%]
                  animate-gradient
                  hover:scale-105
                  focus:outline-none"
              >
                Rewards
              </Link>
            </nav>
          </header>

        <main className="p-8">{children}</main>

        <footer className="p-4 text-center text-gray-500 border-t">
          © {new Date().getFullYear()} My Web App
        </footer>
      </body>
    </html>
  );
}