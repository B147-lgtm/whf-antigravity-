import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Upload, Loader2, Save, Trash2, X, GripVertical, Image as ImageIcon } from 'lucide-react';

interface GalleryItem {
    id: string;
    url: string;
    type: 'image' | 'video';
    category: string;
    label: string;
    thumbnail: string | null;
    display_order: number;
    created_at: string;
}

const GalleryEditor: React.FC = () => {
    const [data, setData] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Modal State
    const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);

    // Drag State
    const dragItem = useRef<number | null>(null);
    const dragOverItem = useRef<number | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        const { data: dbData, error: dbError } = await supabase!
            .from('gallery_media')
            .select('*')
            .order('display_order', { ascending: true, nullsFirst: false })
            .order('created_at', { ascending: false });

        if (dbError) setError(dbError.message);
        else setData(dbData || []);
        setLoading(false);
    };

    const handleBulkUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || event.target.files.length === 0) return;

        try {
            setSaving(true);
            setError(null);
            const files = Array.from(event.target.files);

            const uploadPromises = files.map(async (file) => {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
                const filePath = `public/${fileName}`;

                const { error: uploadError } = await supabase!.storage
                    .from('images')
                    .upload(filePath, file);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase!.storage
                    .from('images')
                    .getPublicUrl(filePath);

                return publicUrl;
            });

            const uploadedUrls = await Promise.all(uploadPromises);

            // To properly append, we need to know the highest display order currently so they are added to the end.
            const maxOrder = data.length > 0 ? Math.max(...data.map(d => d.display_order || 0)) : 0;

            const insertData = uploadedUrls.map((url, i) => ({
                url: url,
                type: 'image',
                category: 'General',
                label: 'Gallery Upload',
                display_order: maxOrder + i + 1
            }));

            const { error: dbError } = await supabase!.from('gallery_media').insert(insertData);
            if (dbError) throw dbError;

            await fetchData();
            event.target.value = ''; // Reset
        } catch (err: any) {
            setError(`Bulk upload error: ${err.message}`);
        } finally {
            setSaving(false);
        }
    };

    // --- Drag and Drop Logic ---
    const handleSort = async () => {
        if (dragItem.current === null || dragOverItem.current === null) return;

        const dragIndex = dragItem.current;
        const hoverIndex = dragOverItem.current;

        if (dragIndex === hoverIndex) return;

        // Clone deeply
        let _data = [...data];
        const draggedItemContent = _data.splice(dragIndex, 1)[0];
        _data.splice(hoverIndex, 0, draggedItemContent);

        // Re-assign explicit sequential orders to match visual layout
        const updatedData = _data.map((item, index) => ({
            ...item,
            display_order: index + 1 // Start at 1
        }));

        setData(updatedData); // Optimistic UI update
        dragItem.current = null;
        dragOverItem.current = null;

        // Save to Database quietly
        setSaving(true);
        try {
            // We only need to send the id and the new display_order, but upsert needs proper formatting
            const payload = updatedData.map(item => ({
                id: item.id,
                url: item.url,
                type: item.type,
                category: item.category,
                label: item.label,
                thumbnail: item.thumbnail,
                display_order: item.display_order
            }));

            const { error } = await supabase!.from('gallery_media').upsert(payload);
            if (error) throw error;
        } catch (err: any) {
            setError(`Sorting error: ${err.message}`);
            await fetchData(); // Rollback to actual db state on error
        } finally {
            setSaving(false);
        }
    };

    // --- Edit Modal Logic ---
    const handleSaveModal = async () => {
        if (!editingItem) return;
        setSaving(true);
        setError(null);

        try {
            const { id, created_at, ...updateData } = editingItem;
            // Only attempt an update if the ID exists (it always should here)
            const { error: updateError } = await supabase!
                .from('gallery_media')
                .update(updateData)
                .eq('id', id);

            if (updateError) throw updateError;

            setEditingItem(null);
            await fetchData();
        } catch (err: any) {
            setError(`Error saving details: ${err.message}`);
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteModal = async () => {
        if (!editingItem || !window.confirm('Are you sure you want to permanently delete this gallery image?')) return;
        setSaving(true);
        setError(null);
        try {
            const { error: delError } = await supabase!.from('gallery_media').delete().eq('id', editingItem.id);
            if (delError) throw delError;
            setEditingItem(null);
            await fetchData();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin w-10 h-10 text-amber-500" /></div>;

    return (
        <div className="max-w-7xl mx-auto pb-20">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-neutral-900 border-b-2 border-amber-500 inline-block pb-1">Gallery Manager</h2>
                    <p className="text-sm text-neutral-500 mt-2">Drag and drop images to reorder them on the live website. Click an image to edit its label or category.</p>
                </div>

                <div className="flex space-x-3 items-center">
                    <label className="flex items-center px-6 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-all font-semibold cursor-pointer luxury-shadow">
                        {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
                        Upload Images
                        <input type="file" multiple accept="image/*,video/*" onChange={handleBulkUpload} disabled={saving} className="hidden" />
                    </label>
                </div>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 font-medium rounded-lg">{error}</div>
            )}

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200">
                {data.length === 0 ? (
                    <div className="text-center py-20 text-neutral-400">
                        <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-30" />
                        <p className="text-lg">No gallery items found.</p>
                        <p className="text-sm mt-1">Click "Upload Images" to get started.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {data.map((item, index) => {
                            const isVideo = item.type === 'video';
                            const previewSrc = isVideo && item.thumbnail ? item.thumbnail : item.url;

                            return (
                                <div
                                    key={item.id}
                                    draggable
                                    onDragStart={() => (dragItem.current = index)}
                                    onDragEnter={() => (dragOverItem.current = index)}
                                    onDragEnd={handleSort}
                                    onDragOver={(e) => e.preventDefault()}
                                    onClick={() => setEditingItem(item)}
                                    className="relative group rounded-xl overflow-hidden aspect-square bg-neutral-100 cursor-pointer border-2 border-transparent hover:border-amber-400 transition-all shadow-sm hover:shadow-lg"
                                >
                                    <div className="absolute top-2 left-2 z-10 p-1.5 bg-white/90 backdrop-blur rounded shadow-sm opacity-0 group-hover:opacity-100 cursor-grab active:cursor-grabbing transition-opacity">
                                        <GripVertical className="w-4 h-4 text-neutral-500" />
                                    </div>

                                    <img
                                        src={previewSrc}
                                        alt={item.label}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        onError={(e) => {
                                            if (isVideo && !item.thumbnail) {
                                                e.currentTarget.style.display = 'none';
                                            } else {
                                                e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Invalid+Image';
                                            }
                                        }}
                                    />

                                    {isVideo && !item.thumbnail && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                                            <div className="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center backdrop-blur-sm">
                                                <svg className="w-4 h-4 text-neutral-900 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                            </div>
                                        </div>
                                    )}

                                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-white px-2 py-0.5 rounded text-xs font-mono font-bold z-10">
                                        {index + 1}
                                    </div>

                                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <p className="text-white text-xs font-bold truncate">{item.category}</p>
                                        <p className="text-white/80 text-[10px] truncate">{item.label}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Modal Overlay */}
            {editingItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="flex justify-between items-center p-6 border-b border-neutral-100">
                            <h3 className="text-xl font-bold text-neutral-900">Edit Gallery Item</h3>
                            <button onClick={() => setEditingItem(null)} className="text-neutral-400 hover:text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-full p-2 transition-colors">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto space-y-4">
                            {/* Preview inside modal */}
                            <div className="w-full h-40 bg-neutral-100 rounded-xl overflow-hidden relative mb-2 luxury-shadow">
                                <img
                                    src={editingItem.type === 'video' && editingItem.thumbnail ? editingItem.thumbnail : editingItem.url}
                                    className="w-full h-full object-cover"
                                    alt="Preview"
                                />
                                {editingItem.type === 'video' && !editingItem.thumbnail && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                                        <div className="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center backdrop-blur-sm">
                                            <svg className="w-4 h-4 text-neutral-900 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-neutral-600 uppercase mb-1">Media Type</label>
                                <select
                                    value={editingItem.type}
                                    onChange={e => setEditingItem({ ...editingItem, type: e.target.value as 'image' | 'video' })}
                                    className="w-full px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                                >
                                    <option value="image">Image</option>
                                    <option value="video">Video</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-neutral-600 uppercase mb-1">Category</label>
                                <select
                                    value={editingItem.category}
                                    onChange={e => setEditingItem({ ...editingItem, category: e.target.value })}
                                    className="w-full px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                                >
                                    <option value="Presidential Suite">Presidential Suite</option>
                                    <option value="Bedrooms">Bedrooms</option>
                                    <option value="Pool">Pool</option>
                                    <option value="Lawns">Lawns</option>
                                    <option value="Events">Events</option>
                                    <option value="Bar Garden">Bar Garden</option>
                                    <option value="Living Area">Living Area</option>
                                    <option value="General">General</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-neutral-600 uppercase mb-1">Label / Title</label>
                                <input
                                    type="text"
                                    value={editingItem.label}
                                    onChange={e => setEditingItem({ ...editingItem, label: e.target.value })}
                                    className="w-full px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-neutral-600 uppercase mb-1">Source URL</label>
                                <input
                                    type="url"
                                    value={editingItem.url}
                                    onChange={e => setEditingItem({ ...editingItem, url: e.target.value })}
                                    className="w-full px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none font-mono text-xs"
                                />
                            </div>

                            {editingItem.type === 'video' && (
                                <div>
                                    <label className="block text-xs font-semibold text-neutral-600 uppercase mb-1">Video Thumbnail URL</label>
                                    <input
                                        type="url"
                                        value={editingItem.thumbnail || ''}
                                        onChange={e => setEditingItem({ ...editingItem, thumbnail: e.target.value })}
                                        className="w-full px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none font-mono text-xs"
                                        placeholder="https://example.com/thumb.jpg"
                                    />
                                </div>
                            )}

                        </div>

                        <div className="p-6 border-t border-neutral-100 flex justify-between bg-neutral-50">
                            <button
                                onClick={handleDeleteModal}
                                disabled={saving}
                                className="px-4 py-2 text-red-600 hover:bg-red-100 rounded-lg font-medium transition-colors flex items-center disabled:opacity-50"
                            >
                                <Trash2 className="w-4 h-4 mr-2" /> Delete
                            </button>
                            <button
                                onClick={handleSaveModal}
                                disabled={saving}
                                className="px-6 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors font-medium flex items-center luxury-shadow disabled:opacity-50"
                            >
                                {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GalleryEditor;
