
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import MobileCTA from './MobileCTA';
import ScrollProgress from './ScrollProgress';
import FloatingActions from './FloatingActions';

interface LayoutProps {
  children: React.ReactNode;
  // The Connect page already presents full-size WhatsApp/Instagram cards,
  // so the floating shortcuts and mobile CTA bar would just duplicate
  // (and visually overlap) those same actions there.
  hideOverlays?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, hideOverlays = false }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollProgress />
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      {!hideOverlays && <MobileCTA />}
      {!hideOverlays && <FloatingActions />}
    </div>
  );
};

export default Layout;
