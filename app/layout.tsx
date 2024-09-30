import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import Header from './components/Header';
import StoreProvider from './StoreProvider';

export const metadata: Metadata = {
  title: 'Form-engine',
  description: 'Registration + profile',
};

const inter = Inter({ subsets: ['cyrillic'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ru'>
      <body className={`min-h-screen flex flex-col ${inter.className}`}>
        <StoreProvider>
          <Header></Header>
          <main>{children}</main>
          <footer></footer>
        </StoreProvider>
      </body>
    </html>
  );
}
