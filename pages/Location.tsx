
import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import { getLocationSettings } from '../lib/api';

const Location: React.FC = () => {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getLocationSettings();
        setSettings(data);
      } catch (err) {
        console.error("Location load error:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const address = settings?.address || "Wood Heaven Farms, 621, 622, Green Triveni, Opposite Ashiana Greens, Sikar Road, Jaipur, Rajasthan 302013";
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
  const externalMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  if (loading) return null;

  return (
    <div className="min-h-screen py-32 px-4 md:px-20 bg-[#FDFCFB]">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div className="order-2 lg:order-1">
          <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.5em] uppercase mb-4 block">Neighborhood</span>
          <h1 className="text-5xl md:text-8xl font-serif text-[#1A2F1F] mb-8 leading-tight">The Estate <br /> <span className="italic">Address</span></h1>
          <p className="text-xl text-[#D4AF37] mb-12 font-serif italic">{settings?.short_area || 'Sikar Road, Jaipur'}</p>
          
          <div className="space-y-12 mb-16">
            <div className="border-l border-[#1A2F1F]/10 pl-12">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-4 text-[#1A2F1F]">Accessibility</h3>
              <p className="text-sm text-gray-400 font-light leading-relaxed max-w-sm">
                Situated in the serene Green Triveni enclave, Wood Heaven Farms offers a peaceful escape with convenient access to Jaipur's main landmarks.
              </p>
            </div>

            <div className="border-l border-[#1A2F1F]/10 pl-12">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-4 text-[#1A2F1F]">Location Details</h3>
              <p className="text-sm text-gray-600 font-medium leading-relaxed max-w-sm">
                {address}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
              <div>
                <span className="block text-2xl font-serif text-[#1A2F1F]">{settings?.airport_time || '45m'}</span>
                <span className="text-[9px] uppercase tracking-[0.3em] text-gray-400">Airport</span>
              </div>
              <div>
                <span className="block text-2xl font-serif text-[#1A2F1F]">{settings?.railway_time || '30m'}</span>
                <span className="text-[9px] uppercase tracking-[0.3em] text-gray-400">Railway</span>
              </div>
              <div>
                <span className="block text-2xl font-serif text-[#1A2F1F]">{settings?.city_time || '15m'}</span>
                <span className="text-[9px] uppercase tracking-[0.3em] text-gray-400">City Line</span>
              </div>
            </div>
          </div>

          <Button variant="primary" onClick={() => window.open(externalMapUrl, '_blank')}>
            Open in Google Maps
          </Button>
        </div>

        <div className="order-1 lg:order-2 h-[600px] relative luxury-shadow overflow-hidden group rounded-3xl border border-[#1A2F1F]/5 bg-gray-100">
          <iframe
            src={mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Wood Heaven Farms Location"
            className="grayscale contrast-[1.1] opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
          ></iframe>
          <div className="absolute top-6 right-6 pointer-events-none">
            <div className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-[#D4AF37]/20 shadow-sm">
              <span className="text-[8px] font-bold uppercase tracking-widest text-[#1A2F1F]">Live Location Map</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
