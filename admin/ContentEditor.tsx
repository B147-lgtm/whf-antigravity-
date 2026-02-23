import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Save, Plus, Trash2, Loader2, Link as LinkIcon, Upload, MapPin, Star, Sparkles, Settings, MessageSquare } from 'lucide-react';
import ImageUpload from './ImageUpload';

interface ContentEditorProps {
    tableName: string;
    title: string;
    fields: { name: string; label: string; type: 'text' | 'textarea' | 'url' | 'number' | 'json' }[];
    isSingle?: boolean; // For tables like site_settings with only one row
}

const ContentEditor: React.FC<ContentEditorProps> = ({ tableName, title, fields, isSingle = false }) => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [uploadModes, setUploadModes] = useState<{ [key: string]: boolean }>({}); // Toggle between manual URL and Upload

    useEffect(() => {
        fetchData();
    }, [tableName]);

    const fetchData = async () => {
        setLoading(true);
        const { data, error } = await supabase!
            .from(tableName)
            .select('*')
            .order(isSingle ? 'id' : 'created_at', { ascending: true });

        if (error) setError(error.message);
        else setData(data || []);
        setLoading(false);
    };

    const handleSaveRow = async (rowIndex: number) => {
        setSaving(true);
        const row = data[rowIndex];
        let result;

        if (row.id && (typeof row.id !== 'string' || (typeof row.id === 'string' && row.id.length > 0))) {
            // Update
            const { id, created_at, updated_at, ...updateData } = row;
            result = await supabase!.from(tableName).update(updateData).eq('id', id);
        } else {
            // Insert
            const { id, ...insertData } = row;
            result = await supabase!.from(tableName).insert([insertData]);
        }

        if (result.error) setError(result.error.message);
        else fetchData();
        setSaving(false);
    };

    const handleDeleteRow = async (id: any) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;
        setSaving(true);
        const { error } = await supabase!.from(tableName).delete().eq('id', id);
        if (error) setError(error.message);
        else fetchData();
        setSaving(false);
    };

    const handleAddField = () => {
        const newRow = fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), { id: null });
        setData([...data, newRow]);
    };

    const updateField = (index: number, fieldName: string, value: any) => {
        const newData = [...data];
        newData[index] = { ...newData[index], [fieldName]: value };
        setData(newData);
    };

    const toggleUploadMode = (rowId: string, fieldName: string) => {
        const key = `${rowId}-${fieldName}`;
        setUploadModes(prev => ({ ...prev, [key]: !prev[key] }));
    };

    if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin w-10 h-10 text-amber-500" /></div>;

    return (
        <div className="max-w-6xl mx-auto pb-20">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-neutral-900">{title}</h2>
                {!isSingle && (
                    <button
                        onClick={handleAddField}
                        className="flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-all font-medium"
                    >
                        <Plus className="w-4 h-4 mr-2" /> Add New
                    </button>
                )}
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">{error}</div>
            )}

            <div className="space-y-8">
                {data.map((row, index) => {
                    const rowId = row.id || `new-${index}`;
                    return (
                        <div key={rowId} className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                {fields.map((field) => {
                                    const isUrlField = field.type === 'url' || field.name.toLowerCase().includes('url') || field.name.toLowerCase().includes('image');
                                    const uploadMode = uploadModes[`${rowId}-${field.name}`];

                                    return (
                                        <div key={field.name} className={field.type === 'textarea' || field.type === 'json' || isUrlField ? 'md:col-span-2' : ''}>
                                            <div className="flex items-center justify-between mb-2">
                                                <label className="block text-sm font-semibold text-neutral-600 uppercase tracking-wider">{field.label}</label>
                                                {isUrlField && (
                                                    <button
                                                        onClick={() => toggleUploadMode(rowId, field.name)}
                                                        className="text-xs text-amber-600 hover:text-amber-700 font-medium flex items-center transition-colors"
                                                    >
                                                        {uploadMode ? <LinkIcon className="w-3 h-3 mr-1" /> : <Upload className="w-3 h-3 mr-1" />}
                                                        {uploadMode ? 'Switch to URL' : 'Upload Image'}
                                                    </button>
                                                )}
                                            </div>

                                            {field.type === 'textarea' || field.type === 'json' ? (
                                                <textarea
                                                    value={field.type === 'json' ? (typeof row[field.name] === 'object' ? JSON.stringify(row[field.name], null, 2) : row[field.name]) : (row[field.name] || '')}
                                                    onChange={(e) => {
                                                        let val = e.target.value;
                                                        if (field.type === 'json') {
                                                            try { val = JSON.parse(e.target.value); } catch (e) { /* keep as string while typing */ }
                                                        }
                                                        updateField(index, field.name, val);
                                                    }}
                                                    className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-amber-500 outline-none h-32 font-mono text-xs"
                                                    placeholder={field.type === 'json' ? '[{"label": "Item", "detail": "Description"}]' : ''}
                                                />
                                            ) : isUrlField && uploadMode ? (
                                                <ImageUpload
                                                    onUpload={(url) => updateField(index, field.name, url)}
                                                    currentUrl={row[field.name]}
                                                />
                                            ) : (
                                                <input
                                                    type={field.type === 'number' ? 'number' : 'text'}
                                                    value={row[field.name] || ''}
                                                    onFocus={(e) => e.target.select()}
                                                    onChange={(e) => updateField(index, field.name, e.target.value)}
                                                    className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-amber-500 outline-none"
                                                    placeholder={isUrlField ? 'https://example.com/image.jpg' : ''}
                                                />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="flex justify-end space-x-3 border-t border-neutral-100 pt-6">
                                {!isSingle && row.id && (
                                    <button
                                        onClick={() => handleDeleteRow(row.id)}
                                        className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                    >
                                        <Trash2 className="w-4 h-4 mr-2" /> Delete
                                    </button>
                                )}
                                <button
                                    onClick={() => handleSaveRow(index)}
                                    disabled={saving}
                                    className="flex items-center px-6 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-all disabled:opacity-50 font-bold"
                                >
                                    {saving ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ContentEditor;
