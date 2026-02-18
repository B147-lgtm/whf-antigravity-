
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { getGalleryMedia } from '../lib/api';

const Gallery: React.FC = () => {
  const navigate = useNavigate();
  const categories = ['All', 'Presidential Suite', 'Bedrooms', 'Pool', 'Lawns', 'Events', 'Bar Garden', 'Living Area'] as const;
  
  const [activeTab, setActiveTab] = useState<string>('All');
  const [mediaItems, setMediaItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState<any | null>(null);

  useEffect(() => {
    const loadMedia = async () => {
      setLoading(true);
      try {
        const data = await getGalleryMedia(activeTab);
        setMediaItems(data);
      } catch (err) {
        console.error("Gallery load error:", err);
      } finally {
        setLoading(false);
      }
    };
    loadMedia();
  }, [activeTab]);

  return (
    <div className="min-h-screen py-32 px-4 md:px-12 bg-[#FDFCFB]">
      <div className="max-w-[1600px] mx-auto">
        <header className="mb-24 flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-8xl font-serif text-[#1A2F1F] mb-12">Visual Journey</h1>
          
          <div className="flex flex-wrap justify-center gap-8 border-y border-[#1A2F1F]/5 py-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`text-[10px] uppercase tracking-[0.3em] transition-all relative py-2 ${
                  activeTab === cat 
                    ? 'text-[#D4AF37] font-bold' 
                    : 'text-gray-400 hover:text-[#1A2F1F]'
                }`}
              >
                {cat}
                {activeTab === cat && <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#D4AF37]"></div>}
              </button>
            ))}
          </div>
        </header>

        {loading ? (
          <div className="py-40 flex justify-center">
            <div className="w-10 h-10 border-t-2 border-[#D4AF37] rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {mediaItems.map((item) => (
              <div 
                key={item.id} 
                className="group relative overflow-hidden bg-[#1A2F1F]/5 break-inside-avoid cursor-pointer rounded-3xl luxury-shadow border border-[#1A2F1F]/5"
                onClick={() => setSelectedMedia(item)}
              >
                {item.media_type === 'video' ? (
                  <div className="relative">
                    <video 
                      src={item.url} 
                      className="w-full h-auto object-cover"
                      muted
                      loop
                      onMouseOver={(e) => e.currentTarget.play()}
                      onMouseOut={(e) => e.currentTarget.pause()}
                    />
                    <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                       <span className="text-[8px] text-white uppercase tracking-widest font-bold">Film</span>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full border border-white/40 flex items-center justify-center bg-white/10 backdrop-blur-sm group-hover:scale-125 transition-transform">
                        <svg className="w-5 h-5 text-white fill-current translate-x-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      </div>
                    </div>
                  </div>
                ) : (
                  <img 
                    src={item.url} 
                    alt={item.label} 
                    className="w-full h-auto object-cover transition-transform duration-[1.5s] group-hover:scale-110" 
                  />
                )}
                <div className="absolute inset-0 bg-[#1A2F1F]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <span className="text-white text-[10px] uppercase tracking-[0.5em] font-bold border-b border-white pb-2">
                    {item.media_type === 'video' ? 'Play Film' : 'Expand View'}
                  </span>
                </div>
                <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  <p className="text-white text-[10px] tracking-widest uppercase font-medium">{item.label}</p>
                  <p className="text-white/40 text-[8px] tracking-widest uppercase mt-1">{item.category}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-40 text-center py-24 border-t border-[#1A2F1F]/5">
          <h2 className="text-3xl md:text-5xl font-serif mb-12 text-[#1A2F1F]">Immerse Yourself.</h2>
          <Button variant="primary" onClick={() => navigate('/enquiry')}>
            Request Availability
          </Button>
        </div>
      </div>

      {selectedMedia && (
        <div 
          className="fixed inset-0 z-[80] bg-[#1A2F1F]/98 flex items-center justify-center p-4 md:p-12 animate-fade-in"
          onClick={() => setSelectedMedia(null)}
        >
          <button className="absolute top-10 right-10 text-white/60 hover:text-white transition-colors z-[90]">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="relative max-w-[90vw] max-h-[85vh] overflow-hidden rounded-2xl shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {selectedMedia.media_type === 'video' ? (
              <video 
                src={selectedMedia.url} 
                controls 
                autoPlay 
                className="w-full h-full max-h-[85vh] object-contain bg-black"
              />
            ) : (
              <img 
                src={selectedMedia.url} 
                className="w-full h-auto max-h-[85vh] object-contain" 
                alt={selectedMedia.label} 
              />
            )}
            <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
               <p className="text-white font-serif italic text-2xl mb-1">{selectedMedia.label}</p>
               <p className="text-white/40 text-[10px] uppercase tracking-[0.5em]">{selectedMedia.category}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
