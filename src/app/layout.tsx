import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import CartDrawer from "@/components/ui/CartDrawer";
import WishlistDrawer from "@/components/ui/WishlistDrawer";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AutoRoma | Premium Car Fragrances",
  description:
    "Luxury car fragrances crafted for every journey. Transform your drive with AutoRoma's premium mist and hanging collections.",
  keywords: [
    "car fragrance",
    "premium perfume",
    "luxury car accessories",
    "AutoRoma",
    "car perfume",
  ],
  openGraph: {
    title: "AutoRoma | Premium Car Fragrances",
    description: "Luxury Has A New Fragrance",
    url: "https://autoroma.in",
    siteName: "AutoRoma",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${poppins.variable}`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <CartProvider>
          <WishlistProvider>
            {children}
            <CartDrawer />
            <WishlistDrawer />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
