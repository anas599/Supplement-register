import './globals.css';
import NavBar from './component/navBar';
import { GlobalContextProvider } from './context/store';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <title>Supplements Register (POS)</title>
        <NavBar />
        <GlobalContextProvider>{children}</GlobalContextProvider>
      </body>
    </html>
  );
}
