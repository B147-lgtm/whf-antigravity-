
import React from 'react';
import { useNavigate } from 'react-router-dom';

const MobileCTA: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-[#1A2F1F]/10 px-4 py-3 flex gap-3 z-40 shadow-2xl">
      <a
        href="https://wa.me/918852021119?text=Hi Wood Heaven Farms, I want to enquire about a booking."
        className="flex-1 bg-green-600 text-white text-center py-3 rounded-sm text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.29-4.143c1.565.933 3.176 1.403 4.842 1.403 4.829 0 8.756-3.928 8.758-8.758 0-2.34-.911-4.54-2.565-6.195-1.655-1.655-3.855-2.567-6.195-2.567-4.827 0-8.755 3.927-8.758 8.757 0 1.735.474 3.426 1.371 4.911l-.119.189-1.006 3.674 3.766-.987.196-.119zM15.812 14.046c-.25-.124-1.477-.727-1.707-.81-.23-.082-.395-.124-.562.124-.167.248-.646.81-.791.976-.145.166-.29.187-.54.062-.25-.124-1.054-.388-2.008-1.24-.741-.662-1.242-1.48-1.387-1.728-.145-.248-.015-.382.11-.506.113-.112.25-.29.375-.434.125-.145.167-.248.25-.414.083-.166.042-.31-.02-.434-.063-.124-.562-1.355-.77-1.85-.203-.483-.41-.417-.562-.425-.145-.007-.312-.008-.479-.008-.166 0-.437.062-.666.31-.229.248-.875.855-.875 2.085 0 1.23.896 2.417.996 2.557.1.141 1.763 2.69 4.272 3.774.597.257 1.063.411 1.426.527.6.19 1.147.163 1.579.099.482-.072 1.477-.603 1.685-1.185.21-.582.21-1.08.146-1.185-.064-.105-.23-.167-.48-.29z"/>
        </svg>
        WhatsApp
      </a>
      <button
        onClick={() => navigate('/enquiry')}
        className="flex-1 bg-[#1A2F1F] text-white py-3 rounded-sm text-xs font-bold uppercase tracking-widest"
      >
        Enquire Now
      </button>
    </div>
  );
};

export default MobileCTA;
