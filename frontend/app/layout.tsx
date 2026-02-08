import "./globals.css";

export const metadata = {
  title: "DealFlow-AI",
  description: "Describe your startup, get instant government signals"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
