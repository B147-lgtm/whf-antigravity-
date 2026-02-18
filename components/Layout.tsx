
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import MobileCTA from './MobileCTA';
import ScrollProgress from './ScrollProgress';
import FloatingActions from './FloatingActions';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollProgress />
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <MobileCTA />
      <FloatingActions />
    </div>
  );
};

export default Layout;
