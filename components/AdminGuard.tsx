import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

interface AdminGuardProps {
    children: React.ReactNode;
}

const AdminGuard: React.FC<AdminGuardProps> = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await (supabase?.auth.getSession() || Promise.resolve({ data: { session: null } }));

            if (session) {
                setAuthenticated(true);
            } else {
                navigate('/admin/login');
            }
            setLoading(false);
        };

        checkAuth();

        const { data: { subscription } } = supabase?.auth.onAuthStateChange((_event, session) => {
            if (session) {
                setAuthenticated(true);
            } else {
                setAuthenticated(false);
                navigate('/admin/login');
            }
        }) || { data: { subscription: { unsubscribe: () => { } } } };

        return () => {
            subscription.unsubscribe();
        };
    }, [navigate]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-neutral-900">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
            </div>
        );
    }

    return authenticated ? <>{children}</> : null;
};

export default AdminGuard;
