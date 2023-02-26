import React, { ReactNode } from 'react';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main id="main">{children}</main>
    </>
  );
}

export default Layout;
