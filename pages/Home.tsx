
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { getSiteSettings, getHomeHighlights, getExperiences, getTestimonials } from '../lib/api';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<any>(null);
  const [highlights, setHighlights] = useState<any[]>([]);
  const [experiences, setExperiences] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    const loadData = async () => {
      try {
        const [s, h, e, t] = await Promise.all([
          getSiteSettings(),
          getHomeHighlights(),
          getExperiences(),
          getTestimonials()
        ]);
        setSettings(s);
        setHighlights(h);
        setExperiences(e);
        setTestimonials(t);
      } catch (err) {
        console.error("Home load error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-[#FDFCFB] flex items-center justify-center">
      <div className="w-12 h-12 border-t-2 border-[#D4AF37] rounded-full animate-spin"></div>
    </div>;
  }

  const whatsappUrl = `https://wa.me/${settings?.whatsapp_number || '918852021119'}?text=${encodeURIComponent(settings?.whatsapp_prefill || 'Hi Wood Heaven Farms, I want to enquire about a booking.')}`;

  return (
    <div className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Immersive Hero Section with Parallax */}
      <section className="relative h-screen flex items-end justify-start overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center scale-110" 
          style={{ 
            backgroundImage: `url("${settings?.hero_bg_url || 'https://images.unsplash.com/photo-1536431311719-398b6704d40f?auto=format&fit=crop&q=80&w=2000'}")`,
            transform: `translateY(${scrollY * 0.3}px) scale(1.05)`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A2F1F]/90 via-[#1A2F1F]/20 to-transparent"></div>
        </div>
        
        <div className="relative z-10 p-8 md:p-20 max-w-6xl">
          <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-5xl md:text-[110px] text-white leading-[0.9] mb-12 max-w-5xl tracking-tight font-light">
              <span className="font-sans text-xs md:text-sm uppercase tracking-[0.8em] block mb-8 opacity-60">Welcome to the</span>
              <span className="font-editorial italic pl-0 md:pl-16 text-[#D4AF37] block mt-2 lowercase">
                {settings?.hero_title || 'wood heaven Farms'}
              </span>
            </h1>
          </div>
          
          <div className={`transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-80' : 'translate-y-10 opacity-0'}`}>
            <p className="text-white text-sm md:text-base tracking-[0.2em] uppercase font-light mb-12 max-w-md">
              {settings?.hero_subtitle || 'Private Luxury farmhouse stay and event estate'}
            </p>
          </div>
          
          <div className={`flex flex-col md:flex-row items-center gap-6 mb-16 transition-all duration-1000 delay-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <Button variant="secondary" onClick={() => window.open(whatsappUrl, '_blank')}>
              WhatsApp Now
            </Button>
            <Button variant="outline" className="text-white border-white/40" onClick={() => navigate('/enquiry')}>
              Send Enquiry
            </Button>
          </div>

          <div className={`flex flex-wrap gap-4 text-[9px] md:text-[10px] font-bold text-white/60 tracking-[0.4em] uppercase transition-all duration-1000 delay-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <span className="bg-white/10 px-5 py-3 rounded-full backdrop-blur-sm border border-white/5">8 Deluxe Suites</span>
            <span className="bg-white/10 px-5 py-3 rounded-full backdrop-blur-sm border border-white/5">Private Pool</span>
            <span className="bg-white/10 px-5 py-3 rounded-full backdrop-blur-sm border border-white/5">4 Lawns</span>
            <span className="bg-white/10 px-5 py-3 rounded-full backdrop-blur-sm border border-white/5">Bar Garden</span>
            <span className="bg-white/10 px-5 py-3 rounded-full backdrop-blur-sm border border-white/5">Bonfire</span>
          </div>
        </div>
      </section>

      {/* Visual Highlights Strip */}
      <section className="py-24 bg-[#FDFCFB]">
        <div className="max-w-[1800px] mx-auto px-8 md:px-16">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <h2 className="text-3xl md:text-6xl font-editorial text-[#1A2F1F]">The Estate Highlights</h2>
            <p className="text-gray-400 text-sm max-w-xs font-light leading-relaxed">
              Explore our meticulously designed spaces, from serene suites to vibrant event lawns.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {highlights.map((h) => (
              <div 
                key={h.id} 
                className="group relative h-[300px] md:h-[400px] overflow-hidden rounded-2xl luxury-shadow cursor-pointer"
                onClick={() => navigate('/gallery')}
              >
                <img 
                  src={h.image_url} 
                  alt={h.label} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A2F1F]/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <span className="text-white text-[10px] uppercase tracking-[0.3em] font-bold">{h.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Cards Section */}
      <section className="py-32 bg-[#1A2F1F] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <div className="text-center mb-24">
            <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.5em] uppercase mb-4 block">Our Offering</span>
            <h2 className="text-4xl md:text-8xl font-editorial">Curated Experiences</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {experiences.map((exp) => (
              <div key={exp.id} className="group flex flex-col gap-6 bg-white/[0.03] p-8 rounded-3xl border border-white/5 hover:bg-white/5 transition-all duration-500">
                <div className="aspect-video overflow-hidden rounded-2xl relative">
                  {/* Fix: changed exp.image_url to exp.imageUrl to match the Experience type and updated mock data */}
                  <img src={exp.imageUrl} alt={exp.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>
                <div>
                  <h3 className="text-xl font-editorial mb-3 text-[#D4AF37]">{exp.title}</h3>
                  <p className="text-gray-400 text-xs font-light mb-8 leading-relaxed h-12 overflow-hidden">{exp.description}</p>
                  <Button variant="outline" className="text-white border-white/20 w-full py-3" onClick={() => navigate('/enquiry')}>
                    Enquire
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Teaser Section */}
      <section className="py-24 px-8 md:px-16">
        <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden relative h-[500px] luxury-shadow group cursor-pointer" onClick={() => navigate('/gallery')}>
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] group-hover:scale-105"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&q=80&w=2000")' }}
          ></div>
          <div className="absolute inset-0 bg-[#1A2F1F]/40 flex flex-col items-center justify-center text-center p-8">
            <div className="w-20 h-20 rounded-full border border-white/40 flex items-center justify-center mb-8 bg-white/10 backdrop-blur-md group-hover:scale-110 transition-transform">
               <svg className="w-8 h-8 text-white fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
            <h3 className="text-white text-3xl md:text-6xl font-editorial mb-4">A Glimpse of Paradise</h3>
            <p className="text-white/60 text-[10px] uppercase tracking-[0.5em] mb-8 font-bold">Press to view film</p>
            <Button variant="outline" className="text-white border-white/40" onClick={(e: React.MouseEvent<HTMLButtonElement>) => { e.stopPropagation(); navigate('/gallery'); }}>
              View Gallery
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Strip / Testimonials */}
      <section className="py-32 bg-[#FDFCFB]">
        <div className="max-w-7xl mx-auto px-8 md:px-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {testimonials.map((t) => (
              <div key={t.id} className="flex flex-col items-center">
                <div className="flex justify-center gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full"></div>)}
                </div>
                <p className="text-2xl font-editorial italic text-[#1A2F1F] mb-6 leading-relaxed">
                  "{t.text}"
                </p>
                <div className="text-[10px] font-bold tracking-[0.4em] uppercase text-gray-400">
                  {t.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
