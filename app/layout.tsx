import { ReactNode } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
