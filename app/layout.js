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
      <body className="flex flex-col bg-slate-50">
        <Header />
        <DateBanner />
        {children}
      </body>
    </html>
  );
}
