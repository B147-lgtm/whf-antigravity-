
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import SupabaseGuard from './components/SupabaseGuard';
import AdminGuard from './components/AdminGuard';
import AdminLayout from './admin/AdminLayout';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Estate from './pages/Estate';
import Location from './pages/Location';
import Enquiry from './pages/Enquiry';
import Login from './admin/Login';
import Dashboard from './admin/Dashboard';
import ContentEditor from './admin/ContentEditor';

const App: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<SupabaseGuard><Layout><Home /></Layout></SupabaseGuard>} />
      <Route path="/gallery" element={<SupabaseGuard><Layout><Gallery /></Layout></SupabaseGuard>} />
      <Route path="/estate" element={<SupabaseGuard><Layout><Estate /></Layout></SupabaseGuard>} />
      <Route path="/location" element={<SupabaseGuard><Layout><Location /></Layout></SupabaseGuard>} />
      <Route path="/enquiry" element={<SupabaseGuard><Layout><Enquiry /></Layout></SupabaseGuard>} />

      {/* Admin Routes */}
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin" element={<AdminGuard><AdminLayout><Dashboard /></AdminLayout></AdminGuard>} />
      <Route path="/admin/settings" element={<AdminGuard><AdminLayout><ContentEditor tableName="site_settings" title="Site Settings" isSingle fields={[
        { name: 'hero_title', label: 'Hero Title', type: 'text' },
        { name: 'hero_subtitle', label: 'Hero Subtitle', type: 'text' },
        { name: 'hero_bg_url', label: 'Hero Background URL', type: 'url' },
        { name: 'teaser_bg_url', label: 'Teaser Video Background URL', type: 'url' },
        { name: 'whatsapp_number', label: 'WhatsApp Number', type: 'text' },
        { name: 'whatsapp_prefill', label: 'WhatsApp Prefill Message', type: 'textarea' },
      ]} /></AdminLayout></AdminGuard>} />
      <Route path="/admin/testimonials" element={<AdminGuard><AdminLayout><ContentEditor tableName="testimonials" title="Testimonials" fields={[
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'text', label: 'Review Text', type: 'textarea' },
      ]} /></AdminLayout></AdminGuard>} />
      <Route path="/admin/experiences" element={<AdminGuard><AdminLayout><ContentEditor tableName="experiences" title="Experiences" fields={[
        { name: 'title', label: 'Title', type: 'text' },
        { name: 'description', label: 'Description', type: 'textarea' },
        { name: 'image_url', label: 'Image URL', type: 'url' },
      ]} /></AdminLayout></AdminGuard>} />
      <Route path="/admin/gallery" element={<AdminGuard><AdminLayout><ContentEditor tableName="gallery_media" title="Gallery" fields={[
        { name: 'label', label: 'Label', type: 'text' },
        { name: 'url', label: 'Media URL', type: 'url' },
        { name: 'type', label: 'Type (image/video)', type: 'text' },
        { name: 'category', label: 'Category', type: 'text' },
        { name: 'thumbnail', label: 'Thumbnail URL (optional)', type: 'url' },
      ]} /></AdminLayout></AdminGuard>} />
      <Route path="/admin/enquiries" element={<AdminGuard><AdminLayout><ContentEditor tableName="enquiries" title="Enquiries" fields={[
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'email', label: 'Email', type: 'text' },
        { name: 'phone', label: 'Phone', type: 'text' },
        { name: 'message', label: 'Message', type: 'textarea' },
      ]} /></AdminLayout></AdminGuard>} />
      <Route path="/admin/highlights" element={<AdminGuard><AdminLayout><ContentEditor tableName="home_highlights" title="Home Highlights" fields={[
        { name: 'label', label: 'Label', type: 'text' },
        { name: 'image_url', label: 'Image URL', type: 'url' },
      ]} /></AdminLayout></AdminGuard>} />
      <Route path="/admin/location" element={<AdminGuard><AdminLayout><ContentEditor tableName="location_settings" title="Location Details" isSingle fields={[
        { name: 'short_area', label: 'Short Area (City/Area)', type: 'text' },
        { name: 'address', label: 'Full Address', type: 'textarea' },
        { name: 'airport_time', label: 'Time to Airport', type: 'text' },
        { name: 'railway_time', label: 'Time to Railway', type: 'text' },
        { name: 'city_time', label: 'Time to City Center', type: 'text' },
      ]} /></AdminLayout></AdminGuard>} />
      <Route path="/admin/estate-sections" element={<AdminGuard><AdminLayout><ContentEditor tableName="estate_sections" title="Estate Sections" fields={[
        { name: 'title', label: 'Title', type: 'text' },
        { name: 'tag', label: 'Tag (e.g. Residential)', type: 'text' },
        { name: 'description', label: 'Description', type: 'textarea' },
        { name: 'display_order', label: 'Order', type: 'number' },
      ]} /></AdminLayout></AdminGuard>} />
      <Route path="/admin/estate-protocols" element={<AdminGuard><AdminLayout><ContentEditor tableName="estate_protocols" title="Estate Manifesto" fields={[
        { name: 'title', label: 'Title', type: 'text' },
        { name: 'text', label: 'Content', type: 'textarea' },
        { name: 'display_order', label: 'Order', type: 'number' },
      ]} /></AdminLayout></AdminGuard>} />
      <Route path="/admin/blocks" element={<AdminGuard><AdminLayout><ContentEditor tableName="content_blocks" title="Content Blocks" fields={[
        { name: 'page_name', label: 'Page', type: 'text' },
        { name: 'section_key', label: 'Section ID', type: 'text' },
        { name: 'title', label: 'Title', type: 'text' },
        { name: 'description', label: 'Description', type: 'textarea' },
        { name: 'image_url', label: 'Image URL', type: 'url' },
      ]} /></AdminLayout></AdminGuard>} />
    </Routes>
  );
};

// Simple wrapper to fix potential gallery naming conflict or issues
const RouteGallery = () => <Gallery />;

export default App;
