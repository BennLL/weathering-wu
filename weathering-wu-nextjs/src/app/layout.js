import Providers from "@/components/provider";
import Title from "@/components/title"; 
import "./globals.css"; 
import { Kode_Mono } from "next/font/google";

const kodeMono = Kode_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Load the weights you need
  variable: "--font-kode-mono", // Optional: defines a CSS variable
  display: "swap",
});

export const metadata = {
  title: "Weathering WU",
  description: "A simple, fast weather dashboard built with Next.js. Check live weather and sign up to save your favorite cities for quick access!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className = {kodeMono.className}>
        <Providers>
          <div> 
             <Title />
             {children} 
          </div>
        </Providers>
      </body>
    </html>
  );
}