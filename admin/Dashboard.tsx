import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Users, Image, MessageSquare, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
    const [stats, setStats] = useState({
        enquiries: 0,
        gallery: 0,
        testimonials: 0,
        highlights: 0,
        estateSections: 0,
        protocols: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            if (!supabase) return;

            const [enquiries, gallery, testimonials, highlights, estate, protocolData] = await Promise.all([
                supabase.from('enquiries').select('*', { count: 'exact', head: true }),
                supabase.from('gallery_media').select('*', { count: 'exact', head: true }),
                supabase.from('testimonials').select('*', { count: 'exact', head: true }),
                supabase.from('home_highlights').select('*', { count: 'exact', head: true }),
                supabase.from('estate_sections').select('*', { count: 'exact', head: true }),
                supabase.from('estate_protocols').select('*', { count: 'exact', head: true })
            ]);

            setStats({
                enquiries: enquiries.count || 0,
                gallery: gallery.count || 0,
                testimonials: testimonials.count || 0,
                highlights: highlights.count || 0,
                estateSections: estate.count || 0,
                protocols: protocolData.count || 0
            });
        };

        fetchStats();
    }, []);

    const cards = [
        { label: 'Enquiries', value: stats.enquiries, icon: MessageSquare, color: 'bg-blue-500', link: '/admin/enquiries' },
        { label: 'Gallery', value: stats.gallery, icon: Image, color: 'bg-purple-500', link: '/admin/gallery' },
        { label: 'Home Highlights', value: stats.highlights, icon: Star, color: 'bg-amber-500', link: '/admin/highlights' },
        { label: 'Estate Sections', value: stats.estateSections, icon: Sparkles, color: 'bg-emerald-500', link: '/admin/estate-sections' },
    ];

    return (
        <div className="max-w-6xl mx-auto">
            <header className="mb-10">
                <h1 className="text-4xl font-bold text-neutral-900">Welcome back, Admin</h1>
                <p className="text-neutral-500 mt-2">Everything on Wood Heaven Farms is now under your control.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {cards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <Link key={card.label} to={card.link} className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 flex items-center hover:scale-[1.02] transition-transform">
                            <div className={`${card.color} p-3 rounded-lg mr-4`}>
                                <Icon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest leading-none mb-1">{card.label}</p>
                                <p className="text-2xl font-bold text-neutral-900 leading-none">{card.value}</p>
                            </div>
                        </Link>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <section className="bg-neutral-900 rounded-3xl p-8 text-white md:col-span-2">
                    <h3 className="text-xl font-bold mb-6 flex items-center">
                        <ArrowRight className="w-5 h-5 mr-3 text-amber-500" />
                        Quick Access
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            { label: 'Site Settings', path: '/admin/settings' },
                            { label: 'Home Highlights', path: '/admin/highlights' },
                            { label: 'Gallery Media', path: '/admin/gallery' },
                            { label: 'Experiences', path: '/admin/experiences' },
                            { label: 'Location Details', path: '/admin/location' },
                            { label: 'Estate Manifesto', path: '/admin/estate-protocols' },
                            { label: 'Estate Sections', path: '/admin/estate-sections' },
                            { label: 'Testimonials', path: '/admin/testimonials' }
                        ].map((link) => (
                            <Link key={link.path} to={link.path} className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all border border-white/5">
                                <span className="text-sm font-medium">{link.label}</span>
                                <ArrowRight className="w-4 h-4 text-white/40" />
                            </Link>
                        ))}
                    </div>
                </section>

                <section className="space-y-6">
                    <div className="bg-white rounded-3xl p-8 border border-neutral-100 shadow-sm text-center">
                        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                        </div>
                        <h3 className="text-lg font-bold text-neutral-900 mb-2">Live & Connected</h3>
                        <p className="text-neutral-500 text-sm leading-relaxed">
                            Every change is pushed in real-time. The estate's digital presence is mirror-perfect.
                        </p>
                    </div>

                    <div className="bg-amber-50 rounded-3xl p-8 border border-amber-100">
                        <h4 className="text-amber-900 font-bold text-sm uppercase tracking-widest mb-4">Pro Tip</h4>
                        <p className="text-amber-800 text-sm italic">
                            "Use the 'Static Blocks' section to fine-tune specific text lines on the hero pages."
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Dashboard;
