import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import {
    Settings,
    Image,
    Star,
    MessageSquare,
    MapPin,
    LogOut,
    LayoutDashboard,
    Sparkles
} from 'lucide-react';

interface AdminLayoutProps {
    children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await supabase?.auth.signOut();
        navigate('/admin/login');
    };

    const navItems = [
        { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/admin/settings', label: 'Site Settings', icon: Settings },
        { path: '/admin/gallery', label: 'Gallery', icon: Image },
        { path: '/admin/highlights', label: 'Home Highlights', icon: Star },
        { path: '/admin/experiences', label: 'Experiences', icon: Sparkles },
        { path: '/admin/location', label: 'Location Details', icon: MapPin },
        { path: '/admin/estate-sections', label: 'Estate Sections', icon: Star },
        { path: '/admin/estate-protocols', label: 'Estate Manifesto', icon: Sparkles },
        { path: '/admin/blocks', label: 'Static Blocks', icon: Settings },
        { path: '/admin/testimonials', label: 'Testimonials', icon: MessageSquare },
        { path: '/admin/enquiries', label: 'Enquiries', icon: MessageSquare },
    ];

    return (
        <div className="flex min-h-screen bg-neutral-50">
            {/* Sidebar */}
            <aside className="w-64 bg-neutral-900 text-white flex-shrink-0">
                <div className="p-6">
                    <h1 className="text-xl font-bold text-amber-500 uppercase tracking-widest">Admin Portal</h1>
                    <p className="text-xs text-neutral-400 mt-1">Wood Heaven Farms</p>
                </div>

                <nav className="mt-6">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center px-6 py-4 transition-colors ${isActive
                                    ? 'bg-amber-500/10 text-amber-500 border-r-4 border-amber-500'
                                    : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
                                    }`}
                            >
                                <Icon className="w-5 h-5 mr-3" />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-6 py-4 mt-auto text-neutral-400 hover:bg-red-500/10 hover:text-red-500 transition-colors"
                    >
                        <LogOut className="w-5 h-5 mr-3" />
                        <span className="font-medium">Logout</span>
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-10 overflow-auto">
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;
