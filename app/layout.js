import "./globals.css";
import Header from "./UI/Header";

export const metadata = {
  title: "Space Center",
  description: "A space news hub, created by Trevor Brown.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className=" bg-slate-200">
        <Header />
        {children}
      </body>
    </html>
  );
}
