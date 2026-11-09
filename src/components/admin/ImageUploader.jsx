import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, X, Link as LinkIcon, CheckCircle2, AlertCircle } from 'lucide-react';
import { adminService } from '../../services/adminService';

export default function ImageUploader({
  value = '',
  onChange,
  bucketName = 'tour-images',
  label = 'Cover Image',
  helpText = 'Upload a high-quality JPEG or PNG (max 5MB).',
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [manualUrl, setManualUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = async (file) => {
    if (!file) return;

    // Validate type
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (JPEG, PNG, WebP).');
      return;
    }

    // Validate size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image size exceeds 5MB limit. Please choose a smaller image.');
      return;
    }

    setUploadError(null);
    setIsUploading(true);

    try {
      const publicUrl = await adminService.uploadImage(file, bucketName);
      onChange(publicUrl);
    } catch (err) {
      console.error('Image upload failed:', err);
      setUploadError(err.message || 'Failed to upload image. Please check your storage bucket permissions.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleManualUrlSubmit = (e) => {
    e.preventDefault();
    if (manualUrl.trim()) {
      onChange(manualUrl.trim());
      setManualUrl('');
      setShowUrlInput(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold uppercase tracking-wider text-navy-700">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-xs text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1 transition-colors"
        >
          <LinkIcon className="w-3 h-3" />
          {showUrlInput ? 'Upload file instead' : 'Use image URL'}
        </button>
      </div>

      {showUrlInput ? (
        <div className="flex gap-2">
          <input
            type="url"
            value={manualUrl}
            onChange={(e) => setManualUrl(e.target.value)}
            placeholder="https://images.unsplash.com/photo-..."
            className="flex-1 px-3.5 py-2 text-sm rounded-xl border border-navy-200 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500"
          />
          <button
            type="button"
            onClick={handleManualUrlSubmit}
            className="px-4 py-2 bg-teal-600 text-white rounded-xl text-sm font-semibold hover:bg-teal-700 transition-colors"
          >
            Apply
          </button>
        </div>
      ) : null}

      {/* Preview or Dropzone */}
      {value ? (
        <div className="relative rounded-2xl overflow-hidden border border-navy-200 bg-navy-50 group aspect-video max-h-56">
          <img
            src={value}
            alt="Preview"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80';
            }}
          />
          <div className="absolute inset-0 bg-navy-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="px-3 py-1.5 bg-white text-navy-900 rounded-lg text-xs font-semibold shadow hover:bg-navy-50 transition-colors"
            >
              Replace Image
            </button>
            <button
              type="button"
              onClick={() => onChange('')}
              className="p-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              title="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="absolute top-2 left-2 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-md text-[10px] font-semibold text-navy-700 shadow-sm flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-teal-600" /> Image Selected
          </div>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-teal-500 bg-teal-50/50 scale-[0.99]'
              : 'border-navy-200 hover:border-teal-400 bg-navy-50/40 hover:bg-navy-50/70'
          }`}
        >
          {isUploading ? (
            <div className="py-4 flex flex-col items-center">
              <div className="w-8 h-8 border-3 border-teal-200 border-t-teal-600 rounded-full animate-spin mb-3" />
              <p className="text-sm font-semibold text-navy-800">Uploading to {bucketName}...</p>
              <p className="text-xs text-navy-500 mt-1">Please wait a moment</p>
            </div>
          ) : (
            <div className="py-2 flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl bg-white border border-navy-100 shadow-sm flex items-center justify-center text-teal-600 mb-3 group-hover:scale-110 transition-transform">
                <UploadCloud className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-navy-900">
                Click to upload or drag & drop
              </p>
              <p className="text-xs text-navy-500 mt-1">{helpText}</p>
            </div>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
          }
        }}
        className="hidden"
      />

      {uploadError && (
        <div className="flex items-center gap-2 p-2.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{uploadError}</span>
        </div>
      )}
    </div>
  );
}
