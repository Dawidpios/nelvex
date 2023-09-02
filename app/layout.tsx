import { Poppins } from "next/font/google";
import Navigation from "@/components/navigation/Navigation"
import ThemeProvider  from './Context/store';
import "./globals.css";

export const metadata = {
  title: "Nelvex",
  description: "Generated by Next.js",
};
const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
});

type DashboardLayoutProps = {
  children: React.ReactNode;
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body>
      <ThemeProvider>
        <Navigation></Navigation>
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
