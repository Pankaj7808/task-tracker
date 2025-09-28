import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Todo App",
  description: "Manage task",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        <div className="root">
        {children}
        </div>
      </body>
    </html>
  );
}
