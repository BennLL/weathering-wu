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
  description: "Weather App",
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