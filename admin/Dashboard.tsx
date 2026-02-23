import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Users, Image, MessageSquare, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
    const [stats, setStats] = useState({
        enquiries: 0,
        gallery: 0,
        testimonials: 0,
        highlights: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            if (!supabase) return;

            const [enquiries, gallery, testimonials, highlights] = await Promise.all([
                supabase.from('enquiries').select('*', { count: 'exact', head: true }),
                supabase.from('gallery_media').select('*', { count: 'exact', head: true }),
                supabase.from('testimonials').select('*', { count: 'exact', head: true }),
                supabase.from('home_highlights').select('*', { count: 'exact', head: true })
            ]);

            setStats({
                enquiries: enquiries.count || 0,
                gallery: gallery.count || 0,
                testimonials: testimonials.count || 0,
                highlights: highlights.count || 0
            });
        };

        fetchStats();
    }, []);

    const cards = [
        { label: 'Total Enquiries', value: stats.enquiries, icon: MessageSquare, color: 'bg-blue-500', link: '/admin/enquiries' },
        { label: 'Gallery Items', value: stats.gallery, icon: Image, color: 'bg-purple-500', link: '/admin/gallery' },
        { label: 'Home Highlights', value: stats.highlights, icon: Star, color: 'bg-amber-500', link: '/admin/highlights' },
    ];

    return (
        <div className="max-w-6xl mx-auto">
            <header className="mb-10">
                <h1 className="text-4xl font-bold text-neutral-900">Welcome back, Admin</h1>
                <p className="text-neutral-500 mt-2">Manage your luxury farmhouse estate from here.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {cards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <div key={card.label} className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100 flex items-center">
                            <div className={`${card.color} p-4 rounded-xl mr-6`}>
                                <Icon className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-neutral-500 uppercase tracking-wider">{card.label}</p>
                                <p className="text-3xl font-bold text-neutral-900 mt-1">{card.value}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <section className="bg-neutral-900 rounded-2xl p-8 text-white">
                    <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                    <div className="space-y-4">
                        <Link to="/admin/settings" className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
                            <span>Edit Site Settings</span>
                            <ArrowRight className="w-5 h-5 text-amber-500" />
                        </Link>
                        <Link to="/admin/gallery" className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
                            <span>Manage Gallery</span>
                            <ArrowRight className="w-5 h-5 text-amber-500" />
                        </Link>
                        <Link to="/admin/highlights" className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
                            <span>Manage Home Highlights</span>
                            <ArrowRight className="w-5 h-5 text-amber-500" />
                        </Link>
                    </div>
                </section>

                <section className="bg-white rounded-2xl p-8 border border-neutral-100 shadow-sm">
                    <h3 className="text-xl font-bold text-neutral-900 mb-4">Site Status</h3>
                    <div className="flex items-center text-green-600 font-medium">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                        Website Live & Connected
                    </div>
                    <p className="text-neutral-500 mt-4 text-sm">
                        All changes made in this portal are reflected in real-time on the frontend once saved.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default Dashboard;
