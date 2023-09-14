import "./globals.css";
import Header from "./UI/Header";

export const metadata = {
  title: "Space Center",
  description: "A space news hub, created by Trevor Brown.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        <Header />
        {children}
      </body>
    </html>
  );
}
