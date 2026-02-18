
import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import { createEnquiry, getSiteSettings } from '../lib/api';

const Enquiry: React.FC = () => {
  const [settings, setSettings] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    guest_count: '',
    event_type: 'Staycation',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    getSiteSettings().then(setSettings).catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createEnquiry({
        name: formData.name,
        phone: formData.phone,
        date: formData.date || null,
        guest_count: formData.guest_count ? parseInt(formData.guest_count) : null,
        event_type: formData.event_type,
        message: formData.message
      });
      setSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        date: '',
        guest_count: '',
        event_type: 'Staycation',
        message: ''
      });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      alert("There was an issue submitting your request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappUrl = `https://wa.me/${settings?.whatsapp_number || '918852021119'}?text=${encodeURIComponent(settings?.whatsapp_prefill || 'Hi Wood Heaven Farms, I want to enquire about a booking.')}`;

  return (
    <div className="min-h-screen py-32 px-4 md:px-20 bg-[#FDFCFB]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-24">
          <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.5em] uppercase mb-4 block">Concierge</span>
          <h1 className="text-5xl md:text-8xl font-editorial text-[#1A2F1F]">Begin Your <br /> <span className="italic">Journey</span></h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-4 flex flex-col justify-center">
            <div className="space-y-12">
              <div>
                <h4 className="text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] font-bold mb-4">Direct Link</h4>
                <p className="text-sm font-light text-gray-500 mb-6 leading-relaxed">For immediate assistance or quick bookings, connect via WhatsApp.</p>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-bold border-b border-[#1A2F1F] pb-1 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all">
                  Chat with a Specialist
                </a>
              </div>
              
              <div className="pt-12 border-t border-[#1A2F1F]/5">
                <h4 className="text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] font-bold mb-4">Response Time</h4>
                <p className="text-sm italic font-editorial text-gray-400">Our concierge team typically responds within 4-6 hours during business hours.</p>
              </div>

              <div className="pt-12 border-t border-[#1A2F1F]/5">
                <h4 className="text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] font-bold mb-4">Official Email</h4>
                <p className="text-sm font-light text-gray-500">woodheavenfarms@gmail.com</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="bg-white p-10 md:p-16 luxury-shadow relative rounded-3xl overflow-hidden">
              {submitted ? (
                <div className="text-center py-20 animate-fade-in">
                  <h3 className="text-3xl font-editorial text-[#D4AF37] mb-6">Request Received.</h3>
                  <p className="text-sm text-gray-400 font-light tracking-wide">A member of our team will contact you shortly to curate your experience.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="relative group">
                      <input 
                        required 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-transparent border-b border-[#1A2F1F]/10 py-4 outline-none focus:border-[#D4AF37] transition-colors peer text-sm font-light"
                        placeholder=" "
                      />
                      <label className="absolute left-0 top-4 text-[10px] uppercase tracking-widest text-gray-400 transition-all pointer-events-none peer-placeholder-shown:text-sm peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[#D4AF37] -top-4">Full Name</label>
                    </div>

                    <div className="relative group">
                      <input 
                        required 
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-transparent border-b border-[#1A2F1F]/10 py-4 outline-none focus:border-[#D4AF37] transition-colors peer text-sm font-light"
                        placeholder=" "
                      />
                      <label className="absolute left-0 top-4 text-[10px] uppercase tracking-widest text-gray-400 transition-all pointer-events-none peer-placeholder-shown:text-sm peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[#D4AF37] -top-4">Contact Number</label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="relative group">
                      <input 
                        type="date" 
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                        className="w-full bg-transparent border-b border-[#1A2F1F]/10 py-4 outline-none focus:border-[#D4AF37] transition-colors peer text-sm font-light"
                      />
                      <label className="absolute left-0 -top-4 text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">Preferred Arrival</label>
                    </div>

                    <div className="relative group">
                      <select 
                        value={formData.event_type}
                        onChange={(e) => setFormData({...formData, event_type: e.target.value})}
                        className="w-full bg-transparent border-b border-[#1A2F1F]/10 py-4 outline-none focus:border-[#D4AF37] transition-colors text-sm font-light appearance-none"
                      >
                        <option>Staycation</option>
                        <option>Haldi & Mehendi</option>
                        <option>Cocktail Night</option>
                        <option>Birthday Celebration</option>
                        <option>Corporate Retreat</option>
                      </select>
                      <label className="absolute left-0 -top-4 text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">Nature of Visit</label>
                    </div>
                  </div>

                  <div className="relative group">
                    <textarea 
                      rows={4} 
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-transparent border-b border-[#1A2F1F]/10 py-4 outline-none focus:border-[#D4AF37] transition-colors peer text-sm font-light resize-none"
                      placeholder=" "
                    ></textarea>
                    <label className="absolute left-0 top-4 text-[10px] uppercase tracking-widest text-gray-400 transition-all pointer-events-none peer-placeholder-shown:text-sm peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[#D4AF37] -top-4">Special Requests or Guest Details</label>
                  </div>

                  <Button type="submit" variant="primary" className="w-full shadow-2xl" onClick={() => {}}>
                    {submitting ? 'Sending...' : 'Submit Request'}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enquiry;
