
import React from 'react';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const Estate: React.FC = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: "Accommodations",
      tag: "Residential",
      description: "A sanctuary of rest where Rajasthani heritage meets modern minimalist luxury. Each suite is a private haven.",
      items: [
        { label: "Presidential Suite", detail: "1200+ sq. ft. of pure luxury. Features a private sun deck, walk-in closet, and panoramic lawn views." },
        { label: "8 Deluxe Suites", detail: "Individually curated interiors with king-sized royal bedding and curated art pieces." },
        { label: "20 Person Capacity", detail: "Optimized for large-scale family gatherings without compromising on individual privacy." },
        { label: "Open-Air Baths", detail: "Select suites feature private outdoor showers under the canopy of Jaipur's stars." }
      ]
    },
    {
      title: "Leisure & Grounds",
      tag: "Recreation",
      description: "Sprawling across acres of manicured greens, our grounds offer diverse spaces for reflection and celebration.",
      items: [
        { label: "The Infinity Pool", detail: "Temperature-controlled azure waters with a submerged lounging deck and poolside service." },
        { label: "The Vesper Garden", detail: "An intimate bar garden designed for sunset cocktails and moonlit conversations." },
        { label: "Three Grand Lawns", detail: "Versatile emerald carpets capable of hosting up to 200 guests for private events." },
        { label: "The Fire Pit", detail: "A sunken stone hearth for evening storytelling, toasted marshmallows, and winter warmth." }
      ]
    },
    {
      title: "Service & Gastronomy",
      tag: "Hospitality",
      description: "Our dedicated estate team ensures every whim is catered to, from gourmet dining to seamless logistics.",
      items: [
        { label: "Show Kitchen", detail: "A state-of-the-art culinary stage for private chefs or family cooking sessions." },
        { label: "24/7 Concierge", detail: "Personalized assistance for local tours, transportation, and on-site requests." },
        { label: "Grand Lounge", detail: "A double-height living hall with curated library and high-fidelity sound systems." },
        { label: "Private Security", detail: "Discreet, professional 24-hour estate monitoring for total peace of mind." }
      ]
    }
  ];

  const protocols = [
    { title: "Exclusive Access", text: "The estate is exclusively yours. We never host overlapping groups, ensuring total privacy." },
    { title: "Curated Sound", text: "We celebrate life, but respect the land. High-decibel music is moved to our soundproof basement after 10 PM." },
    { title: "External Vendors", text: "We maintain high standards. External catering and decor require prior approval by our estate manager." },
    { title: "Land Stewardship", text: "Guests are guardians of the estate. We ask for mindful enjoyment of our rare flora and fixtures." }
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFB]">
      {/* Hero Header */}
      <section className="pt-48 pb-32 px-8 md:px-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#1A2F1F]/[0.02] -skew-x-12 transform origin-top pointer-events-none"></div>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-16">
            <div className="max-w-4xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-[1px] bg-[#D4AF37]"></div>
                <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.5em] uppercase">The Estate Portfolio</span>
              </div>
              <h1 className="text-6xl md:text-[120px] font-serif leading-[0.85] text-[#1A2F1F] mb-12">
                Designed for <br /> <span className="italic font-editorial text-[#D4AF37]">Distinction</span>
              </h1>
              <p className="text-gray-400 text-xl font-light leading-relaxed max-w-2xl border-l border-[#1A2F1F]/10 pl-8 ml-2">
                Wood Heaven Farms is not just a destination; it is a meticulously crafted lifestyle. Every suite, garden, and service is a testament to the art of fine living.
              </p>
            </div>
            
            <div className="bg-white p-10 rounded-[32px] border border-[#1A2F1F]/5 luxury-shadow w-full lg:w-80 relative z-10">
              <div className="space-y-6">
                <div>
                  <span className="text-[9px] uppercase tracking-[0.3em] text-gray-400 block mb-2">Check-In/Out</span>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-[#1A2F1F]">02:00 PM</span>
                    <div className="w-4 h-[1px] bg-gray-200"></div>
                    <span className="text-sm font-bold text-[#1A2F1F]">11:00 AM</span>
                  </div>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-[0.3em] text-gray-400 block mb-2">Maximum Occupancy</span>
                  <span className="text-xl font-serif text-[#1A2F1F]">20 Adults <span className="text-xs font-sans text-gray-400 uppercase tracking-widest ml-1">Stay</span></span>
                </div>
                <button 
                  onClick={() => navigate('/enquiry')}
                  className="w-full py-4 bg-[#1A2F1F] text-[#D4AF37] text-[10px] uppercase tracking-[0.4em] font-bold rounded-xl hover:bg-black transition-colors"
                >
                  Check Dates
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Presidential Suite Spotlight */}
      <section className="py-40 bg-[#1A2F1F] overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-8 md:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
            <div className="lg:col-span-7 relative">
              <div className="relative aspect-[4/3] rounded-[40px] overflow-hidden luxury-shadow z-20">
                <img 
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200" 
                  alt="Presidential Suite Bedroom" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-16 -right-16 w-1/2 aspect-square rounded-[30px] overflow-hidden border-[12px] border-[#1A2F1F] shadow-2xl z-30 hidden md:block">
                <img 
                  src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800" 
                  alt="Presidential Suite Bath" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-12 -left-12 text-[#D4AF37]/10 text-[200px] font-serif select-none pointer-events-none italic">
                01
              </div>
            </div>
            
            <div className="lg:col-span-5 space-y-12">
              <header>
                <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.5em] uppercase mb-4 block">The Signature Wing</span>
                <h2 className="text-5xl md:text-7xl font-serif text-white mb-8 leading-tight">The Presidential <br /><span className="italic font-editorial text-[#D4AF37]">Suite</span></h2>
                <p className="text-white/60 text-lg font-light leading-relaxed">
                  Our crown jewel. A massive residential suite featuring a double-height ceiling, bespoke handcrafted furniture, and a private balcony that offers the finest view of the sunrise over our infinity pool.
                </p>
              </header>

              <div className="space-y-6">
                <div className="flex items-center gap-6 group cursor-default">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#1A2F1F] transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                  </div>
                  <div>
                    <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-1">Grand Scale</h4>
                    <p className="text-white/40 text-[10px] uppercase tracking-widest">1200+ Square Feet of Living Area</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 group cursor-default">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#1A2F1F] transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" /></svg>
                  </div>
                  <div>
                    <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-1">Royal Comfort</h4>
                    <p className="text-white/40 text-[10px] uppercase tracking-widest">King Size Premium Royal Bedding</p>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-white/10">
                <Button variant="outline" className="text-white border-white/20 hover:border-white" onClick={() => navigate('/gallery')}>Explore The Suite</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Amenities Grid */}
      <section className="py-40 px-8 md:px-20">
        <div className="max-w-7xl mx-auto space-y-48">
          {sections.map((section, idx) => (
            <div key={idx} className={`grid grid-cols-1 lg:grid-cols-12 gap-16 items-start ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              <div className={`lg:col-span-5 ${idx % 2 !== 0 ? 'lg:order-2' : ''}`}>
                <div className="sticky top-40">
                  <span className="text-[10px] font-bold tracking-[0.6em] text-[#D4AF37] uppercase mb-6 block">{section.tag}</span>
                  <h2 className="text-5xl md:text-7xl font-serif text-[#1A2F1F] mb-10 leading-[0.9]">{section.title}</h2>
                  <p className="text-lg text-gray-500 font-light leading-relaxed max-w-sm mb-12">
                    {section.description}
                  </p>
                  <div className="flex items-center gap-4 text-[#1A2F1F]">
                    <span className="text-[10px] font-bold uppercase tracking-widest">Discover Details</span>
                    <div className="w-16 h-[1px] bg-[#1A2F1F]/20"></div>
                  </div>
                </div>
              </div>
              
              <div className={`lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20 ${idx % 2 !== 0 ? 'lg:order-1' : ''}`}>
                {section.items.map((item, i) => (
                  <div key={i} className="group border-t border-[#1A2F1F]/5 pt-8 hover:border-[#D4AF37] transition-all duration-700">
                    <div className="flex justify-between items-start mb-6">
                      <span className="text-[10px] font-bold tracking-[0.4em] text-[#1A2F1F]/20 group-hover:text-[#D4AF37] transition-colors">0{i + 1}</span>
                      <div className="w-2 h-2 rounded-full border border-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <h4 className="text-xl font-serif text-[#1A2F1F] mb-4 group-hover:pl-2 transition-all duration-500">{item.label}</h4>
                    <p className="text-sm text-gray-400 font-light leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The Manifesto */}
      <section className="py-40 bg-[#F5F3F0] overflow-hidden relative">
        <div className="max-w-4xl mx-auto px-8 md:px-20 text-center relative z-10">
          <header className="mb-24">
            <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.6em] uppercase mb-6 block">Our Ethos</span>
            <h2 className="text-5xl md:text-8xl font-serif text-[#1A2F1F] leading-tight">The Estate <br /><span className="italic font-editorial">Manifesto</span></h2>
          </header>

          <div className="space-y-16">
            {protocols.map((protocol, idx) => (
              <div key={idx} className="group relative">
                <div className="absolute -left-12 top-0 text-[#1A2F1F]/5 text-6xl font-serif italic group-hover:text-[#D4AF37]/10 transition-colors">
                  0{idx + 1}
                </div>
                <div className="border-b border-[#1A2F1F]/10 pb-16 last:border-0">
                  <h4 className="text-[11px] uppercase tracking-[0.5em] text-[#D4AF37] font-bold mb-6">{protocol.title}</h4>
                  <p className="text-2xl md:text-3xl font-serif font-light text-[#1A2F1F] leading-tight max-w-2xl mx-auto italic">
                    "{protocol.text}"
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-32">
            <Button variant="primary" className="px-16" onClick={() => navigate('/enquiry')}>
              Request Your Dates
            </Button>
            <p className="mt-8 text-[9px] uppercase tracking-[0.4em] text-gray-400 font-bold">Inquiry Response Guaranteed within 6 Hours</p>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-1/2 left-0 w-64 h-[1px] bg-[#D4AF37]/20 -rotate-45"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-[1px] bg-[#D4AF37]/20 rotate-12"></div>
      </section>

      {/* Cinematic Visual Break */}
      <section className="h-screen relative overflow-hidden flex items-center justify-center">
        <img 
          src="https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&q=80&w=2000" 
          alt="Estate View" 
          className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.3]"
        />
        <div className="relative z-10 text-center px-8">
          <div className="w-px h-32 bg-[#D4AF37]/40 mx-auto mb-16"></div>
          <h3 className="text-white text-4xl md:text-8xl font-editorial italic max-w-5xl leading-[1.1]">
            "A legacy property redefined for the modern connoisseur of space."
          </h3>
          <p className="text-[#D4AF37] text-[10px] font-bold tracking-[0.8em] uppercase mt-12">Wood Heaven Farms</p>
        </div>
      </section>
    </div>
  );
};

export default Estate;
