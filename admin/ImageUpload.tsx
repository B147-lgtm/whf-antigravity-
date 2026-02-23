import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Upload, X, Check, Loader2, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
    onUpload: (url: string) => void;
    currentUrl?: string;
    label?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload, currentUrl, label }) => {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState<string | null>(currentUrl || null);
    const [error, setError] = useState<string | null>(null);

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true);
            setError(null);

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.');
            }

            const file = event.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
            const filePath = `public/${fileName}`;

            // 1. Upload the file to the 'images' bucket
            const { error: uploadError } = await supabase!.storage
                .from('images')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // 2. Get the public URL
            const { data: { publicUrl } } = supabase!.storage
                .from('images')
                .getPublicUrl(filePath);

            setPreview(publicUrl);
            onUpload(publicUrl);
        } catch (err: any) {
            setError(err.message);
            console.error('Error uploading image:', err);
        } finally {
            setUploading(false);
        }
    };

    const handleRemove = () => {
        setPreview(null);
        onUpload('');
    };

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <label className="block text-sm font-semibold text-neutral-600 uppercase tracking-wider">
                    {label || 'Image'}
                </label>
                {preview && (
                    <button
                        onClick={handleRemove}
                        className="text-xs text-red-500 hover:text-red-700 flex items-center transition-colors"
                    >
                        <X className="w-3 h-3 mr-1" /> Remove
                    </button>
                )}
            </div>

            <div className={`relative group border-2 border-dashed rounded-xl overflow-hidden transition-all duration-300 ${preview ? 'border-neutral-200' : 'border-neutral-300 hover:border-amber-500 bg-neutral-50'
                }`}>
                {preview ? (
                    <div className="relative aspect-video bg-neutral-100">
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-neutral-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <label className="cursor-pointer bg-white text-neutral-900 px-4 py-2 rounded-lg font-bold shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                                Change Image
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleUpload}
                                    disabled={uploading}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    </div>
                ) : (
                    <label className="flex flex-col items-center justify-center aspect-video cursor-pointer py-8">
                        {uploading ? (
                            <Loader2 className="w-10 h-10 text-amber-500 animate-spin" />
                        ) : (
                            <Upload className="w-10 h-10 text-neutral-400 group-hover:text-amber-500 mb-2 transition-colors" />
                        )}
                        <span className="text-neutral-500 group-hover:text-amber-600 font-medium">
                            {uploading ? 'Uploading...' : 'Click to upload image'}
                        </span>
                        <span className="text-neutral-400 text-xs mt-1">PNG, JPG, WEBP up to 5MB</span>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleUpload}
                            disabled={uploading}
                            className="hidden"
                        />
                    </label>
                )}
            </div>

            {error && (
                <p className="text-xs text-red-500 mt-1 flex items-center">
                    <X className="w-3 h-3 mr-1" /> {error}
                </p>
            )}

            {preview && !uploading && !error && (
                <p className="text-[10px] text-neutral-400 truncate mt-1">
                    {preview}
                </p>
            )}
        </div>
    );
};

export default ImageUpload;
