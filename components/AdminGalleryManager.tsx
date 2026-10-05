"use client";

import React, { useState } from "react";
import Image from "next/image";
import { createGalleryImageAction, deleteGalleryImageAction } from "@/actions/admin-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, ImageIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface GalleryItem {
  id: string;
  imageUrl: string;
  title: string;
  caption: string | null;
  category: string;
}

export function AdminGalleryManager({ initialImages }: { initialImages: GalleryItem[] }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState("Community");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl || !title) return;
    setIsSubmitting(true);
    await createGalleryImageAction({ imageUrl, title, caption, category });
    setIsSubmitting(false);
    setShowAddForm(false);
    setImageUrl("");
    setTitle("");
    setCaption("");
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this gallery image?")) {
      await deleteGalleryImageAction(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#0F3E36]">Field Gallery</h1>
          <p className="text-xs text-[#64748B]">Manage photos displayed on the public gallery.</p>
        </div>
        <Button
          variant="accent"
          size="sm"
          onClick={() => setShowAddForm(!showAddForm)}
          className="gap-1.5"
        >
          <Plus className="w-4 h-4" /> {showAddForm ? "Cancel" : "Add Photo"}
        </Button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAdd} className="p-6 bg-white rounded-2xl border border-[#E5DFD7] space-y-4">
          <h3 className="font-bold text-base text-[#0F3E36]">Add Gallery Image</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Image URL *"
              placeholder="https://images.unsplash.com/... or Cloudinary URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
            <Input
              label="Title *"
              placeholder="e.g. Free Eye Screening Camp"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-1.5">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="flex h-11 w-full rounded-lg border border-[#E5DFD7] bg-white px-3.5 py-2 text-sm text-[#1E293B]"
              >
                <option value="Community">Community</option>
                <option value="Education">Education</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Relief">Relief</option>
              </select>
            </div>
            <Input
              label="Caption (Optional)"
              placeholder="Brief descriptive caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </div>
          <Button type="submit" variant="primary" isLoading={isSubmitting}>
            Save Photo
          </Button>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {initialImages.map((img) => (
          <div
            key={img.id}
            className="bg-white rounded-xl border border-[#E5DFD7] overflow-hidden shadow-xs flex flex-col justify-between"
          >
            <div className="aspect-[4/3] relative bg-slate-100">
              <Image src={img.imageUrl} alt={img.title} fill className="object-cover" />
            </div>
            <div className="p-4 space-y-1 flex-1">
              <Badge variant="accent" className="text-[10px]">
                {img.category}
              </Badge>
              <h4 className="font-bold text-sm text-[#0F3E36] line-clamp-1">{img.title}</h4>
              {img.caption && <p className="text-xs text-[#64748B] line-clamp-2">{img.caption}</p>}
            </div>
            <div className="p-3 border-t border-[#E5DFD7] flex justify-end">
              <button
                onClick={() => handleDelete(img.id)}
                className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer"
                title="Delete image"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
