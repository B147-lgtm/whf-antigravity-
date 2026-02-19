
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import SupabaseGuard from './components/SupabaseGuard';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Estate from './pages/Estate';
import Location from './pages/Location';
import Enquiry from './pages/Enquiry';

const App: React.FC = () => {
  return (
    <SupabaseGuard>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/estate" element={<Estate />} />
          <Route path="/location" element={<Location />} />
          <Route path="/enquiry" element={<Enquiry />} />
        </Routes>
      </Layout>
    </SupabaseGuard>
  );
};

// Simple wrapper to fix potential gallery naming conflict or issues
const RouteGallery = () => <Gallery />;

export default App;
