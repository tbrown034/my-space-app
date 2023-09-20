import "./globals.css";
import DateBanner from "./UI/DateBanner";
import Header from "./UI/Header";

export const metadata = {
  title: "Space Center",
  description: "A space news hub, created by Trevor Brown.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className=" bg-slate-200 gap2">
        <Header />
        <DateBanner />
        {children}
      </body>
    </html>
  );
}
