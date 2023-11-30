import Sidebar from "@/components/sidebar/sidebar";
import type { Metadata } from "next";
import "@/public/fonts/poppins.css";
import "@/public/styles/hide.css";

export const metadata: Metadata = {
  title: "Picpay Dashboard",
  description: "Dashboard for services health",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, boxSizing: "border-box", backgroundColor: "#111315", }}>
        <div
          style={{
            backgroundColor: "#111315",
            marginLeft: 240,
            position: "relative",
          }}
        >
          {children}
        </div>
        <Sidebar />
      </body>
    </html>
  );
}
