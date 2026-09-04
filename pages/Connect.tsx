
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Home as HomeIcon, Globe, ArrowUpRight } from 'lucide-react';
import { getSiteSettings, getContentBlocks, SiteSettings } from '../lib/api';

const WHATSAPP_NUMBER_FALLBACK = '918852021119';
const WHATSAPP_PREFILL_FALLBACK = 'Hi Wood Heaven Farms, I want to enquire about a booking.';
const INSTAGRAM_URL_FALLBACK = 'https://www.instagram.com/woodheavenfarms/';
const MAPS_URL_FALLBACK = 'https://google.com/maps?um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KWd0ZOpbrW05MeTQhrW2fHnM&daddr=Khasra+No+530,621,+622,+Sikar+Rd,+opposite+ASHIANA+GREENS,+near+Suncity,+Jaipur,+Rajasthan+302013';
const AIRBNB_URL_FALLBACK = 'https://www.airbnb.co.in/rooms/910145959184121862';

const PAGE_TITLE = 'Connect With Us | Wood Heaven Farms Jaipur';
const PAGE_DESCRIPTION = 'Connect with Wood Heaven Farms Jaipur. WhatsApp us, follow us on Instagram, get directions, view our Airbnb listing and visit our official website.';

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const Connect: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [hero, setHero] = useState<{ title?: string; subtitle?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  // Page-specific metadata. No global SEO/meta component exists in this app,
  // so we set it directly here and restore the previous values on unmount.
  useEffect(() => {
    const previousTitle = document.title;
    document.title = PAGE_TITLE;

    let metaDescription = document.querySelector('meta[name="description"]');
    const createdMeta = !metaDescription;
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    const previousDescription = metaDescription.getAttribute('content');
    metaDescription.setAttribute('content', PAGE_DESCRIPTION);

    return () => {
      document.title = previousTitle;
      if (createdMeta) {
        metaDescription?.remove();
      } else if (previousDescription !== null) {
        metaDescription?.setAttribute('content', previousDescription);
      }
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    Promise.all([getSiteSettings(), getContentBlocks('Connect')])
      .then(([settingsData, blocks]) => {
        if (!mounted) return;
        setSettings(settingsData);
        const heroBlock = Array.isArray(blocks) ? blocks.find((b: any) => b.section_key === 'hero') : null;
        setHero(heroBlock || null);
      })
      .catch((err) => console.error('Connect page load error:', err))
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFCFB] flex items-center justify-center">
        <div className="w-12 h-12 border-t-2 border-[#D4AF37] rounded-full animate-spin"></div>
      </div>
    );
  }

  const whatsappNumber = settings?.whatsapp_number || WHATSAPP_NUMBER_FALLBACK;
  const whatsappPrefill = settings?.whatsapp_prefill || WHATSAPP_PREFILL_FALLBACK;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappPrefill)}`;
  const instagramUrl = settings?.instagram_url || INSTAGRAM_URL_FALLBACK;
  const mapsUrl = settings?.maps_url || MAPS_URL_FALLBACK;
  const airbnbUrl = settings?.airbnb_url || AIRBNB_URL_FALLBACK;

  const heading = hero?.title || 'Connect With Us';
  const tagline = hero?.subtitle || 'Luxury Farm Stay • Jaipur';

  const links: {
    key: string;
    label: string;
    detail: string;
    href: string;
    icon: React.FC<{ className?: string }>;
  }[] = [
    { key: 'whatsapp', label: 'WhatsApp Us', detail: '+91 88520 21119', href: whatsappUrl, icon: WhatsAppIcon },
    { key: 'instagram', label: 'Follow Us on Instagram', detail: '@woodheavenfarms', href: instagramUrl, icon: InstagramIcon },
    { key: 'maps', label: 'Get Directions', detail: 'Sikar Road, Jaipur', href: mapsUrl, icon: MapPin },
    { key: 'airbnb', label: 'View on Airbnb', detail: 'See our full listing', href: airbnbUrl, icon: HomeIcon },
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFB] pt-36 md:pt-40 pb-24 px-6 md:px-10">
      <div className="max-w-lg mx-auto text-center animate-reveal">
        <div className="mx-auto mb-8 h-20 w-20 rounded-full border-2 border-[#D4AF37]/20 overflow-hidden bg-[#1A2F1F] flex items-center justify-center luxury-shadow">
          {settings?.brand_logo_url ? (
            <img
              src={settings.brand_logo_url}
              alt="Wood Heaven Farms Logo"
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-[#D4AF37] font-serif font-bold text-2xl">W</span>
          )}
        </div>

        <span className="text-[10px] font-bold tracking-[0.5em] text-[#1A2F1F]/50 uppercase mb-4 block">
          Wood Heaven Farms
        </span>
        <h1 className="font-editorial italic text-5xl md:text-6xl text-[#1A2F1F] mb-4 leading-tight">
          {heading}
        </h1>
        <p className="text-[#D4AF37] text-sm md:text-base tracking-[0.15em] uppercase font-light mb-14">
          {tagline}
        </p>

        <nav aria-label="Connect with Wood Heaven Farms" className="flex flex-col gap-5 text-left">
          {links.map(({ key, label, detail, href, icon: Icon }) => (
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="group flex items-center gap-5 bg-white hover:bg-white border border-black/[0.05] hover:border-[#D4AF37]/40 shadow-sm hover:shadow-lg rounded-3xl px-6 py-5 md:py-6 transition-all duration-500"
            >
              <span className="flex-shrink-0 w-12 h-12 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-white transition-all duration-500">
                <Icon className="w-5 h-5" />
              </span>
              <span className="flex-grow min-w-0">
                <span className="block text-[#1A2F1F] text-sm md:text-base font-bold uppercase tracking-[0.15em]">
                  {label}
                </span>
                <span className="block text-gray-400 text-xs mt-1 truncate font-light">{detail}</span>
              </span>
              <ArrowUpRight className="w-5 h-5 text-gray-300 group-hover:text-[#D4AF37] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500 flex-shrink-0" />
            </a>
          ))}

          <Link
            to="/"
            aria-label="Visit Our Website"
            className="group flex items-center gap-5 bg-[#1A2F1F] hover:bg-black border border-[#1A2F1F] rounded-3xl px-6 py-5 md:py-6 shadow-sm hover:shadow-lg transition-all duration-500"
          >
            <span className="flex-shrink-0 w-12 h-12 rounded-full bg-white/10 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#1A2F1F] transition-all duration-500">
              <Globe className="w-5 h-5" />
            </span>
            <span className="flex-grow min-w-0">
              <span className="block text-white text-sm md:text-base font-bold uppercase tracking-[0.15em]">
                Visit Our Website
              </span>
              <span className="block text-white/40 text-xs mt-1 truncate font-light">woodheavenfarms.com</span>
            </span>
            <ArrowUpRight className="w-5 h-5 text-white/30 group-hover:text-[#D4AF37] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500 flex-shrink-0" />
          </Link>
        </nav>

        <p className="text-[#1A2F1F]/30 text-[9px] uppercase tracking-[0.4em] mt-16">
          Sikar Road &bull; Jaipur, Rajasthan
        </p>
      </div>
    </div>
  );
};

export default Connect;
