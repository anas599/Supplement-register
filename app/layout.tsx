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
        <head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
          />

          <meta name="pwa-demo" content="pwa-demo" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="pwa-demo" />
          <meta name="description" content="pwa-demo" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-TileColor" content="#2B5797" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#000000" />

          <link rel="apple-touch-icon" href="/icon-192x192.png" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="shortcut icon" href="/favicon.ico" />
        </head>
        <NavBar />
        <GlobalContextProvider>{children}</GlobalContextProvider>
      </body>
    </html>
  );
}
