import './globals.css';
import { GlobalContextProvider } from './context/store';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body suppressHydrationWarning={true}>
        <GlobalContextProvider>{children}</GlobalContextProvider>
      </body>{' '}
    </html>
  );
}
