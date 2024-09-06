import { Navbar } from "@/components/navbar";
import Footer from "@/components/ui/footer/footer";
import { INavigationMenu } from "@/lib/contentful/interfaces/blocks";
import { fetchNavMenus } from "@/lib/contentful/nav-menu";
import "@/styles/globals.css";
import clsx from "clsx";
import localFont from "next/font/local";
import { draftMode } from "next/headers";
import { Providers } from "./providers";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

import {
  Inter,
  Lato,
  Merriweather,
  Noto_Sans_Hanunoo,
  Poppins,
  Roboto_Mono,
  Lora,
  Montserrat,
  Open_Sans,
  Playfair_Display,
  Raleway,
  Nunito,
} from "next/font/google";

const NEXT_PUBLIC_GOOGLE_TAGMGR_ID =
  process.env.NEXT_PUBLIC_GOOGLE_TAGMGR_ID || null;

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "300", "400", "600", "700", "800", "900"],
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const playfair_Display = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const open_Sans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "700", "900"],
  display: "swap",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "700", "900"],
});

const noto = Noto_Sans_Hanunoo({
  weight: "400",
  subsets: ["hanunoo"],
});

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
});

// export const metadata: Metadata = {
// 	title: {
// 		default: siteConfig.name,
// 		template: `%s - ${siteConfig.name}`,
// 	},
// 	description: siteConfig.description,
// 	themeColor: [
// 		{ media: "(prefers-color-scheme: light)", color: "white" },
// 		{ media: "(prefers-color-scheme: dark)", color: "black" },
// 	],
// 	icons: {
// 		icon: "/favicon.ico",
// 		shortcut: "/favicon-16x16.png",
// 		apple: "/apple-touch-icon.png",
// 	},
// };

const myFont = localFont({
  src: "./fonts/poppins.woff2",
  display: "swap",
});

const rubik500 = localFont({ src: "fonts/ubuntu.woff2", display: "swap" });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const entry = (await fetchNavMenus(draftMode().isEnabled)) as INavigationMenu;

  const fontName: string = entry?.fields?.font || "Poppins";

  const chosenFont =
    fontName === "Inter"
      ? inter
      : fontName === "Lato"
      ? lato
      : fontName === "Poppins"
      ? poppins
      : fontName === "Roboto_Mono"
      ? roboto_mono
      : fontName === "Merriweather"
      ? merriweather
      : fontName === "Montserrat"
      ? montserrat
      : fontName === "Nunito"
      ? nunito
      : fontName === "Raleway"
      ? raleway
      : fontName === "Playfair_Display"
      ? playfair_Display
      : fontName === "Open_Sans"
      ? open_Sans
      : fontName === "Lora"
      ? lora
      : fontName === "Noto_Sans_Hanunoo"
      ? noto
      : inter; // default to inter

  return (
    <html lang="en" className={chosenFont.className} suppressHydrationWarning>
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background text-background-foreground antialiased"
        )}
      >
        {/* <span className="text-xl">
          <div className="font-bold">This is bold{entry?.fields?.font}</div>
          <div className=" font-semibold">This is semibold</div>
          <div className=" font-extrabold">This is extrabold</div>
          <div className="f font-extralight">This is extra light</div>
          <div className=" italic">This is italic</div>
        </span> */}

        <Providers
          themeProps={{
            attribute: "class",
            defaultTheme: "light",
          }}
        >
          <div className="relative flex flex-col h-screen light dark:dark bg-background text-foreground ">
            <Navbar navEntry={entry} />
            <main className="pt-16x flex-growx ">{children}</main>
            <Footer navEntry={entry} />

            {NEXT_PUBLIC_GOOGLE_TAGMGR_ID && (
              <GoogleTagManager gtmId={NEXT_PUBLIC_GOOGLE_TAGMGR_ID || ""} />
            )}
          </div>
        </Providers>
      </body>
    </html>
  );
}
